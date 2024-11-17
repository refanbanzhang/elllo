// 封装通用的mock请求工具函数
export const mockRequest = <T>(data: T, delay = 300): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

export const photos = [
  {
    id: 1,
    src: "https://live.staticflickr.com/65535/50187927333_12dc192ab6_b.jpg",
    alt: "The hood of a red Ford Mustang",
  },
  {
    id: 2,
    src: "https://live.staticflickr.com/65535/51050627041_6b2297d785_b.jpg",
    alt: "A hilly Pacific coastal scene, accompanied by a luminous orange road sign displaying 'SHOULDER WORK'",
  },
  {
    id: 3,
    src: "https://live.staticflickr.com/7922/46633591944_4d3a91c04a_b.jpg",
    alt: "A person sits in a photobooth on an illuminated orange stool, with the curtain drawn",
  },
  {
    id: 4,
    src: "https://live.staticflickr.com/7541/16141487959_60e2783f41_b.jpg",
    alt: "An old man sleeps on a packed underground train, beneath an advert headlined, 'ACHIEVE YOUR AMBITION'",
  },
  {
    id: 5,
    src: "https://live.staticflickr.com/2925/14160806169_e6f6b10446_b.jpg",
    alt: "Amongst a crowd of a dozen, the two central people are holding their noses, smelling something bad",
  },
  {
    id: 6,
    src: "https://live.staticflickr.com/2519/4129054724_33c64146a8_b.jpg",
    alt: "Aeroplane wings above clouds, with the setting sun peaking through",
  },
  {
    id: 7,
    src: "https://live.staticflickr.com/2553/4128215509_350e93f6e1_b.jpg",
    alt: "A pedestrian crossing sign on a typical Reykjavík street, with mountains in the background",
  },
  {
    id: 8,
    src: "https://live.staticflickr.com/65535/51102069848_cdb82ea7e4_b.jpg",
    alt: "Close-up of a vintage car hubcap",
  },
  {
    id: 9,
    src: "https://live.staticflickr.com/3400/3289907091_f906387549_b.jpg",
    alt: "A man sleeps slumped on the night bus",
  },
];

export const playlists = [
  {
    id: 1,
    avatar: "https://live-transitions.pages.dev/user-avatar.webp",
    name: "Annabelle Lucero",
    date: "March 2023",
    title: "Saxophone House",
    num: 9838,
    duration: "5h 22m",
    media: "https://live-transitions.pages.dev/sax-player.webp",
    style: {
      "--backgroundColor": "black",
      "--textColor": "white",
      "--backgroundImage": "none",
      "--secondaryTextColor": "rgb(195, 195, 195)",
    },
    desc: "Most popular Saxophone House playlist on Spotify since 2013 | Updated weekly | Good vibes only | Photo by Atikh Bana",
  },
  {
    id: 2,
    avatar: "https://live-transitions.pages.dev/user-avatar-2.webp",
    name: "Sophia Chen",
    date: "April 2023",
    title: "Jazz Piano",
    num: 7245,
    duration: "4h 15m",
    media: "https://live-transitions.pages.dev/dancing-woman.mp4",
    style: {
      "--backgroundColor": "#ebd9ea",
      "--textColor": "#8b689c",
      "--backgroundImage":
        "url(https://live-transitions.pages.dev/pink-card-bg.png)",
      "--secondaryTextColor": "#ab91b8",
    },
    desc: "The best indie rock vibes — classic and current. Headphones on | Video by Anna Shvets on pexels.com",
  },
  {
    id: 3,
    avatar: "https://live-transitions.pages.dev/user-avatar-3.webp",
    name: "Marcus Davis",
    date: "May 2023",
    title: "Blues Guitar",
    num: 6389,
    duration: "3h 45m",
    media: "https://live-transitions.pages.dev/guitar-player.webp",
    style: {
      "--backgroundColor": "#6d75ff",
      "--textColor": "white",
      "--backgroundImage": "none",
      "--secondaryTextColor": "rgb(225, 225, 225)",
    },
    desc: "Unwind to these calm classical guitar pieces. Photo by Te NGuyen on Unsplash",
  },
];
