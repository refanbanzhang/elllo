<script setup lang="ts">
import useAudioPlayer from "../../composables/use-audio-player"

const { play, pause, resume, currentIndex, isPlaying, items } = useAudioPlayer([
  {
    "url": "https://s3-us-west-1.amazonaws.com/elllo-audio/mixer-001-150/022-MXR-savingmoney.mp3",
    "title": "Saving Money",
    "html": "<p><strong>Anita / Taiwan</strong><br><strong><img alt=\"speaker\" class=\"floatright\" height=\"70\" src=\"../../Assets/graphics/mixerpix1/Anita-TAIWAN.jpg\" width=\"50\"></strong>Am I good at saving money? I don't think that I'm a good person. I don't think that I'm good at saving money because I spend a lot. I like to go shopping and everytime I go shopping I will buy something so I don't think I am good at saving but I think I'm good at making money.</p><p><strong>Martin / United States</strong><br><strong><img alt=\"speaker\" class=\"floatright\" height=\"70\" src=\"../../Assets/graphics/mixerpix1/Martin-US.jpg\" width=\"50\"></strong>I have to say, if there's one thing I wish I was better at, it's saving money. Right now I'm not very good at it. If I have it I lose it or I spend it on something that I probably don't need but it's too bad because I really need to learn how to save money better but I <span class=\"audionotes\">figure</span> that will come in the future, so.</p><p><strong>Jeanie / United States</strong><br><strong><img alt=\"speaker\" class=\"floatright\" height=\"70\" src=\"../../Assets/graphics/mixerpix1/Jeanie-US.jpg\" width=\"50\"></strong>OK, am I good at saving money. Well, most of my life my family has always been a bit envious of my ability to save. Even when I didn't have a job, I would always have money just backed up somewhere and people would often have to try and get money from me on loan. It's a little difficult now that I have to actually pay rent and things like that but, I'm still pretty good at it.</p><p><strong>Mark / United States</strong><br><strong><img alt=\"speaker\" class=\"floatright\" height=\"70\" src=\"../../Assets/graphics/mixerpix1/Mark-US.jpg\" width=\"49\"></strong>I am terrible at saving money, absolutely terrible. And it's something that I think about a lot because I know I have to get better at it but after payday, that money just <span class=\"audionotes\">burns a hole in my pocket</span>. I go out and I'll spend a hundred dollars in one night, it just, because I got the money in my pocket and then usually before payday, I don't have any money and I'm borrowing money from my friends so it's actually my worst habit, is saving money.</p><p><strong>Ruth / England</strong><br><strong><img alt=\"speaker\" class=\"floatright\" height=\"70\" src=\"../../Assets/graphics/mixerpix1/Ruth-UK.jpg\" width=\"50\"></strong>Good at saving money! Well, I think I am quite good at saving money, except sometimes I am a little bit naughty and I tend to spend, spend, spend. I usually have one day a month in which I go and spend. Except for that, I'm generally quite good. I don't spend too much money. I try to save all of the money that I can so that I can buy something nice at the end.</p><p><strong>Simon / Cananda</strong><br><strong><img alt=\"speaker\" class=\"floatright\" height=\"71\" src=\"../../Assets/graphics/mixerpix1/Simon-CAN.jpg\" width=\"50\"></strong>God no! I'm not good at saving money. I think I usually spend money faster than I can make it. I don't save. I just take money out of my account. I don't pay attention. I don't organize. I don't <span class=\"audionotes\">budget</span>. I buy a lot of things that don't have any <span class=\"audionotes\">resale value</span>, like services and beer, things like that: food, restaurants. I can't save money. I spend money.</p>",
    "img": "https://elllo.org/Cover/CoverMixer/22-MX-SaveMoney.jpg",
    "lessonNo": "T022"
  },
  {
    "url": "https://s3-us-west-1.amazonaws.com/elllo-audio/mixer-001-150/023-MXR-shopping.mp3",
    "title": "Shopping",
    "html": "<p><strong>Kate, New Zealand</strong><br><strong><img alt=\"speaker\" class=\"floatright\" height=\"70\" src=\"../../Assets/graphics/mixerpix1/Kate-NZ.jpg\" width=\"50\"></strong>I like to go shopping and I usually go to the department stores, although they can be a little bit expensive, and I usually shop at Gap or some of the cheaper places in my country, in New Zealand, it's called Glassins and also there are flea markets which I enjoy to just <span class=\"audionotes\">have a look around</span>. I don't buy used clothes that often unless I need them for an event or university event or something. Jewelry I love to buy. </p><p><strong>Mark, United States</strong><br><strong><img alt=\"speaker\" class=\"floatright\" height=\"70\" src=\"../../Assets/graphics/mixerpix1/Mark-US.jpg\" width=\"49\"></strong>I guess like a lot of guys I don't usually like shopping. I'd rather go to the store, know what I want to get, go in, get that thing, buy it and get out. If I got a lot of money, I guess it would be nice to kind of stroll around and shop some but still, I just, usually I'd rather be more focused and just go buy what I want and get out so I'm not a really big fan of shopping.</p><p><strong>Jeanie, United States</strong><br><strong><img alt=\"speaker\" class=\"floatright\" height=\"70\" src=\"../../Assets/graphics/mixerpix1/Jeanie-US.jpg\" width=\"50\"></strong>OK, what do I think about shopping? I really don't like shopping. I'm usually very easily bored with buying things. I try to make really quick decisions, the only <span class=\"audionotes\">exception</span> being with jewelry because it always <span class=\"audionotes\">catches my attention</span>, and then I end up spending too much money, so yes, shopping is definitely not a thing I like to do very often.</p><p><strong>Jim, England</strong><br><strong><img alt=\"speaker\" class=\"floatright\" height=\"70\" src=\"../../Assets/graphics/mixerpix1/Jim-UK.jpg\" width=\"50\"></strong>So I hate shopping. Don't like it at all. The only time I really go shopping is when I go to the super market to get some food or some supplies. I try to avoid clothes shopping because I find it so boring and I tend to <span class=\"audionotes\">rely on</span> my girlfriend or my mother to buy me clothes, which is a little bit sad.</p><p><strong>Eucharia, Ireland</strong><br><strong><img alt=\"speaker\" class=\"floatright\" height=\"70\" src=\"../../Assets/graphics/mixerpix1/Eucharia-IRE.jpg\" width=\"50\"></strong>I go shopping everywhere. In Ireland there are many charity shops, with kind of once worn, or unwanted gift type dresses, so I really like shopping there for really exotic dresses, and when I go shopping, the one time in the year I go shopping I have to think about clothes to wear for <span class=\"audionotes\">distinct</span> seasons of the year, so it's quite a challenge. I go shopping usually to just normal middle of the road type places, but I really, really like shoe shopping.</p><p><strong>Alan, Canada</strong><br><strong><img alt=\"speaker\" class=\"floatright\" height=\"70\" src=\"../../Assets/graphics/mixerpix1/Alan-CA.jpg\" width=\"50\"></strong>What do I think about shopping? Well, I don't really go shopping unless I have to as far was when I buy clothes or things that I need for the house. If I need them, I will go out and buy them, but I don't really like to browse and look around too much, window shop, anything like that. I do however do enjoy food shopping. I enjoy that. Everyone has to food shop at least once a week, so I enjoy shopping for food more than I do shopping for other things. </p>",
    "img": "https://elllo.org/Cover/CoverMixer/23-MX-Shop.jpg",
    "lessonNo": "T023"
  },
])
</script>

<template>
  <div>
    youtube
    <div
      v-for="(_, index) in items"
      :key="index"
    >
      <button
        @click="pause"
        v-if="currentIndex === index && isPlaying"
      >
        暂停
      </button>
      <button
        @click="resume"
        v-else-if="currentIndex === index && !isPlaying"
      >
        继续
      </button>
      <button
        v-else
        @click="play(index)"
      >
        播放
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>
