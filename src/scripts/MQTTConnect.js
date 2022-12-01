class MQTTClient {
  constructor() {
    this.defineField();
    this.client.on("connect", () => {
      this.feeds.forEach((feed) => {
        console.log("Subcribe to feed: " + feed);
        this.client.subscribe(`CanhHoang/feeds/${feed}`);
      });
    });
  }

  defineField() {
    this.feeds = [
      "GH_TEMP",
      "GH_LIGHT",
      "GH_SOIL",
      "GH_HUM",
      "GH_PUMP",
      "GH_BULB",
      "GH_FAN",
      "GH_DOOR",
    ];
    this.feeds_key = ["gh-temp", "gh-light", "gh-soil", "gh-hum"];
    this.moment = require("moment");
    this.mqtt = require("mqtt/dist/mqtt");
    this.username = "CanhHoang";
    this.port = 8883;
    this.key = "aio_MBKO29qQbtkVTkQmohC0qKrjXn9p";
    this.url = `mqtts://${this.username}:${this.key}@io.adafruit.com`;
    this.client = this.mqtt.connect(this.url, this.port);
  }

  on(event, callback) {
    this.client.on(event, callback);
  }

  subscribe(topic) {
    this.client.subscribe(topic);
  }

  publish(topic, message) {
    this.client.publish(topic, message);
  }
}
module.exports = new MQTTClient();
