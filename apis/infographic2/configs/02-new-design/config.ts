import { InfographicConfig } from "../index";

export const config01Location: InfographicConfig.TripInfographic = {
  width: 1280,
  height: 1280,
  backgroundColor: "green",

  type: "location",
  blocks: [
    {
      type: "location-image",
      width: 1280,
      height: 1280,
    },
    // background whole location
    {
      type: "svg",
      url: "./configs/02-new-design/images/location-background.svg",
      positioning: {
        top: 1017 - 48,
      },
    },
    {
      type: "container",
      positioning: {
        top: 929,
        left: 56,
      },
      blocks: [
        // background location name
        {
          type: "svg",
          url: "./configs/02-new-design/images/location-name-background.svg",
          shadowOffset: {
            x: 0,
            y: 4,
          },
          shadowColor: "rgba(0, 0, 0, 0.25)",
          shadowBlur: 4,
        },
        {
          // location name
          type: "text",
          text: "{{location.name}}",
          fontSize: "64px",
          fontFamily: "Nunito",
          fontWeight: "900",
          color: "#2E97A1",
          textAnchor: "start",
          positioning: {
            top: 80,
            left: 140,
          },
        },
        {
          // location activity
          type: "text",
          text: "{{location.activity}}",
          fontSize: "34px",
          fontFamily: "Nunito",
          fontWeight: "600 italic",
          color: "#2E97A1",
          textAnchor: "start",
          width: 500,
          positioning: {
            top: 160,
            left: 140,
          },
        },
      ],
    },
    {
      type: "svg",
      url: "./configs/02-new-design/images/location.svg",
      positioning: {
        top: 836,
        left: 48,
      },
    },
    {
      type: "container",
      positioning: {
        top: 1118,
        left: 846 - 50, // todo
      },
      blocks: [
        {
          type: "svg",
          url: "./configs/02-new-design/images/star.svg",
        },
        {
          // location activity
          type: "text",
          text: "{{location.activity}}",
          fontSize: "32px",
          fontFamily: "Nunito",
          color: "white",
          textAnchor: "start",
          width: 500,
          positioning: {
            top: 0 - 4,
            left: 46,
          },
        },
      ],
    },
    {
      type: "container",
      positioning: {
        top: 1180,
        left: 846 - 50,
      },
      blocks: [
        {
          type: "svg",
          url: "./configs/02-new-design/images/smile.svg",
        },
        {
          // location activity
          type: "text",
          text: "{{location.feeling}}",
          fontSize: "32px",
          fontFamily: "Nunito",
          color: "white",
          textAnchor: "start",
          width: 500,
          positioning: {
            top: 0 - 4,
            left: 46,
          },
        },
      ],
    },
  ],
};

const locationDetailsChildren02: InfographicConfig.Block[] = [
  {
    // location name
    type: "text",
    text: "{{location.name}}",
    fontSize: "64px",
    fontFamily: "Nunito",
    fontWeight: "900",
    color: "#2E97A1",
    textAnchor: "start",
    positioning: {},
  },
  {
    // location activity
    type: "text",
    text: "{{location.activity}}",
    fontSize: "32px",
    fontFamily: "Nunito",
    fontWeight: "600 italic",
    color: "#383838",
    textAnchor: "start",
    width: 500,
    positioning: {
      top: 20,
      left: 0,
    },
  },
  {
    type: "container",
    positioning: {
      top: 75,
      left: 0,
    },
    blocks: [
      {
        type: "svg",
        url: "./configs/02-new-design/images/02-location-n-smile-icon.svg",
      },
      {
        // location activity
        type: "text",
        text: "{{location.feeling}}",
        fontSize: "32px",
        fontFamily: "Nunito",
        fontWeight: "600 italic",
        color: "#383838",
        textAnchor: "start",
        width: 500,
        positioning: {
          left: 50,
        },
      },
    ],
  },
  {
    type: "container",
    positioning: {
      top: 80,
      left: 0,
    },
    blocks: [
      {
        type: "svg",
        url: "./configs/02-new-design/images/02-location-n-like-icon.svg",
      },
      {
        // location activity
        type: "text",
        text: "{{location.hight-lights}}",
        fontSize: "32px",
        fontFamily: "Nunito",
        fontWeight: "600 italic",
        color: "#383838",
        textAnchor: "start",
        width: 500,
        positioning: {
          left: 50,
        },
      },
    ],
  },
];

export const config02Locations: InfographicConfig.TripInfographic = {
  width: 1280,
  height: 1500,
  backgroundColor: "#C0E2E5",

  type: "container",
  blocks: [
    {
      type: "container",
      blocks: [
        //infographic header
        {
          type: "container",
          positioning: {
            left: 133,
            top: 24,
          },
          blocks: [
            {
              type: "svg",
              url:
                "./configs/02-new-design/images/02-location-name-background.svg",
              positioning: {
                // left: 133,
                // top: 24
              },
            },
            // together making location icon with white background
            {
              type: "circle",
              fillColor: "white",
              r: 30,
              x: 93,
              y: 82,
            },
            {
              type: "svg",
              url: "./configs/02-new-design/images/02-location-name-icon.svg",
              positioning: {
                left: 26,
                top: 12,
              },
            },

            // infographic name
            {
              // location name
              type: "text",
              text: "{{trip.name}}",
              fontSize: "64px",
              fontFamily: "Nunito",
              fontWeight: "900",
              color: "white",
              textAnchor: "middle",
              positioning: {
                top: 104,
                left: -40,
              },
            },
            {
              // location activity
              type: "text",
              text: "{{trip.info}}",
              fontSize: "40px",
              fontFamily: "Nunito",
              fontWeight: "normal",
              color: "white",
              textAnchor: "middle",
              width: 500,
              positioning: {
                top: 190,
                left: -40,
              },
            },
          ],
        },
      ],
    },
    {
      type: "location",
      positioning: {
        top: 412,
        left: 97,
      },
      blocks: [
        {
          type: "location-image",
          width: 550 - 4,
          height: 680 - 4,
          positioning: {
            top: 26,
            left: 32,
          },
          rotate: -5.57,
        },
        {
          type: "svg",
          url: "./configs/02-new-design/images/02-location-01-border.svg",
        },
        // location 1 details
        {
          type: "container",
          positioning: {
            top: -30,
            left: 625,
          },
          flex: "column",
          blocks: locationDetailsChildren02,
        },
      ],
    },
    {
      type: "location",
      positioning: {
        top: 724,
        left: 630,
      },
      blocks: [
        {
          type: "location-image",
          width: 550 - 4,
          height: 680 - 4,
          positioning: {
            top: 23,
            left: 29,
          },
          rotate: 5.11,
        },
        {
          type: "svg",
          url: "./configs/02-new-design/images/02-location-02-border.svg",
        },
        // location 1 details
        {
          type: "container",
          positioning: {
            top: 420,
            left: -450,
          },
          flex: "column",
          blocks: locationDetailsChildren02,
        },
      ],
    },
  ],
};

export const configNLocations: InfographicConfig.TripInfographic = {
  width: 1280,
  // height: 3000,
  backgroundColor: "#C0E2E5",

  type: "container",
  flex: "column",
  blocks: [
    {
      type: "container",
      height: 400,
      blocks: [
        //infographic header
        {
          type: "container",
          positioning: {
            left: 133,
            top: 24,
          },
          blocks: [
            {
              type: "svg",
              url:
                "./configs/02-new-design/images/02-location-name-background.svg",
              positioning: {
                // left: 133,
                // top: 24
              },
            },
            // together making location icon with white background
            {
              type: "circle",
              fillColor: "white",
              r: 30,
              x: 93,
              y: 82,
            },
            {
              type: "svg",
              url: "./configs/02-new-design/images/02-location-name-icon.svg",
              positioning: {
                left: 26,
                top: 12,
              },
            },

            // infographic name
            {
              // location name
              type: "text",
              text: "{{trip.name}}",
              fontSize: "64px",
              fontFamily: "Nunito",
              fontWeight: "900",
              color: "white",
              textAnchor: "middle",
              positioning: {
                top: 104,
                left: -40,
              },
            },
            {
              // location activity
              type: "text",
              text: "{{trip.info}}",
              fontSize: "40px",
              fontFamily: "Nunito",
              fontWeight: "normal",
              color: "white",
              textAnchor: "middle",
              width: 500,
              positioning: {
                top: 190,
                left: -40,
              },
            },
          ],
        },
      ],
    },
    {
      type: "locations",
      flex: "column",
      blocks: [
        // 1st location
        {
          type: "location",
          height: 550,
          positioning: {
            // top: 412,
            left: 97,
          },
          blocks: [
            {
              type: "location-image",
              width: 550 - 4,
              height: 680 - 4,
              positioning: {
                top: 26,
                left: 32,
              },
              rotate: -5.57,
            },
            {
              type: "svg",
              url: "./configs/02-new-design/images/02-location-01-border.svg",
            },
            // location 1 details
            {
              type: "container",
              positioning: {
                top: 100,
                left: 625,
              },
              flex: "column",
              blocks: locationDetailsChildren02,
            },
          ],
        },
        //2nd location
        {
          type: "location",
          height: 625,
          positioning: {
            // top: 724,
            left: 630,
          },
          blocks: [
            {
              type: "location-image",
              width: 550 - 4,
              height: 680 - 4,
              positioning: {
                top: 23,
                left: 29,
              },
              rotate: 5.11,
            },
            {
              type: "svg",
              url: "./configs/02-new-design/images/02-location-02-border.svg",
            },
            // location 1 details
            {
              type: "container",
              positioning: {
                top: 270,
                left: -450,
              },
              flex: "column",
              blocks: locationDetailsChildren02,
            },
          ],
        },
      ],
    },
    {
      type: "container",
      height: 300,
      blocks: [],
    },
  ],
};