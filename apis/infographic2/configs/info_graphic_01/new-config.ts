import { InfographicConfig } from "..";

var config_01_01: InfographicConfig.Infographic = {
  width: 1280,
  backgroundColor: "#e3d1a2",

  blocks: [
    {
      type: "location",
      blocks: [
        {
          type: "location-image",
          width: 1280,
          height: 1280
        },
        {
          type: "container",
          // content_height: 300,
          positioning: {
            height: 300
          },
          blocks: [
            {
              // location name
              type: "text",
              text: "{{location.name}}",
              fontSize: "64px",
              fontFamily: "Roboto",
              color: "#d0363b",
              fontWeight: "bold",
              textAnchor: "start",
              textTransform: "uppercase",
              positioning: {
                top: 60,
                left: 20
              }
            },
            {
              // location feeling
              type: "text",
              text: "{{location.feeling}}}}",
              fontSize: "48px",
              fontFamily: "Roboto",
              color: "#121113",
              textAnchor: "start",
              positioning: {
                top: 60,
                left: 20
              }
            },
            {
              // location highlights
              type: "text",
              text: "{{location.hight-lights}}}}",
              fontSize: "48px",
              fontFamily: "Roboto",
              color: "#121113",
              textAnchor: "start",
              positioning: {
                top: 60,
                left: 20
              }
            }
          ]
        }
      ]
    },
    {
      // render footer image
      type: "image",
      url: "put something here",

      // todo should review this one
      positioning: {
        right: 200,
        bottom: 80
      }
    }
  ]
};

var config_01_02: InfographicConfig.Infographic = {
  width: 1280,
  // height: 1500,
  backgroundColor: "rgb(254, 255, 246)",
  blocks: [
    {
      type: "container",
      blocks: [
        {
          type: "text",
          color: "rgb(0, 0, 0)",
          fontFamily: "Roboto",
          fontSize: "64px",
          textAnchor: "middle",
          fontWeight: "bold",
          textTransform: "uppercase",
          positioning: {

          },
          text: "{{trip.name}}"
        },
        {
          type: "text",
          color: "rgb(0, 0, 0)",
          fontFamily: "Roboto",
          fontSize: "64px",
          textAnchor: "middle",
          fontWeight: "bold",
          textTransform: "uppercase",
          positioning: {

          },
          text: "{{trip.info}}}}"
        }
      ]
    },
    {
      type: "container",
      blocks: [
        {
          type: "container",
          blocks: [
            {
              type: "location-image",
              width: 1280 / 2,
              height: 840,
              // svgWidth: 630,
              // svgHeight: 840,
              // viewBoxWidth: 288.5,
              // viewBoxHeight: 384.1,
              // clipPath: "M2.5 2.5H286v379.1H2.5z",
              // paddingTop: 20,
              // paddingBetweenImage: 5
            },
            {
              // location name
              type: "text",
              text: "{{location.name}}",
              fontSize: "64px",
              fontFamily: "Roboto",
              color: "#d0363b",
              fontWeight: "bold",
              textAnchor: "start",
              textTransform: "uppercase",
              positioning: {
                top: 60,
                left: 20
              }
            },
            {
              // location feeling
              type: "text",
              text: "{{location.feeling}}",
              fontSize: "48px",
              fontFamily: "Roboto",
              color: "#121113",
              textAnchor: "start",
              positioning: {
                top: 60,
                left: 20
              }
            },
            {
              // location highlights
              type: "text",
              text: "{{location.hight-lights}}",
              fontSize: "48px",
              fontFamily: "Roboto",
              color: "#121113",
              textAnchor: "start",
              positioning: {
                top: 60,
                left: 20
              }
            }
          ]
        },
        {
          type: "container",
          blocks: [
            {
              type: "location-image",
              width: 1280 / 2,
              height: 840,
              // svgWidth: 630,
              // svgHeight: 840,
              // viewBoxWidth: 288.5,
              // viewBoxHeight: 384.1,
              // clipPath: "M2.5 2.5H286v379.1H2.5z",
              // paddingTop: 20,
              // paddingBetweenImage: 5
            },
            {
              // location name
              type: "text",
              text: "{{location.name}}",
              fontSize: "64px",
              fontFamily: "Roboto",
              color: "#d0363b",
              fontWeight: "bold",
              textAnchor: "start",
              textTransform: "uppercase",
              positioning: {
                top: 60,
                left: 20
              }
            },
            {
              // location feeling
              type: "text",
              text: "{{location.feeling}}",
              fontSize: "48px",
              fontFamily: "Roboto",
              color: "#121113",
              textAnchor: "start",
              positioning: {
                top: 60,
                left: 20
              }
            },
            {
              // location highlights
              type: "text",
              text: "{{location.hight-lights}}",
              fontSize: "48px",
              fontFamily: "Roboto",
              color: "#121113",
              textAnchor: "start",
              positioning: {
                top: 60,
                left: 20
              }
            }
          ]
        },
      ]
    },
    {
      // render footer image
      type: "image",
      url: "put something here",

      // todo should review this one
      positioning: {
        right: 200,
        bottom: 80
      }
    }
  ]

};
