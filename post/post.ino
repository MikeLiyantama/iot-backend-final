#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

const int sleep_time = 20;
WiFiClient client;

const char* ssid = "MAXIMUM THE HORMONE";
const char* password = "zetsuboubilly";

void uploadData(int pot);

void setup() {
  Serial.begin(9600);

  int n = WiFi.scanNetworks();

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }

  Serial.println("Wi-Fi connected");
}

void loop() {
  int pot = analogRead(A0);

  uploadData(pot);

  delay(5000);
}

void uploadData(int pot){
  if(WiFi.status()== WL_CONNECTED){   //Check WiFi connection status
    Serial.println("Masuk");
    
    HTTPClient http;    //Declare object of class HTTPClient
    
    http.begin("http://fast-everglades-80504.herokuapp.com/weathers");      //Specify request destination
    http.addHeader("Content-Type", "application/json");  //Specify content-type header
    http.addHeader("x-auth", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OThjNDM5MjVkNDJjNzAwMTFmZTMxMzkiLCJpYXQiOjE1MDIzNjQ1NjJ9.LdB9PDnYVl2nmj3FrpXIbA93d89B3xPWmH-t4G3Vitk");  //Specify content-type header

    String body = "{\"temperature\": " + String(pot) + ", \"humidity\": " + String(pot) + ", \"information\": \"Test dari NodeMCU\"}";
    
    int httpCode = http.POST(body);   //Send the request
    //int httpCode = http.GET();
    String payload = http.getString();                  //Get the response payload
    
    Serial.println(httpCode);   //Print HTTP return code
    Serial.println(payload);    //Print request response payload
    
    http.end();  //Close connection
  }else{
    Serial.println("Error in WiFi connection");   
  }
}
