import { Devvit, useForm, useState } from '@devvit/public-api';

Devvit.configure({
  redditAPI: true,
  media: true,
  customPostType: true,
  ui: true,});

const myForm = Devvit.createForm(
  (data) => {
    return {
      fields: [
        {
          type: 'string',
          name: 'movieTitle',
          label: 'Movie Title',
          defaultValue: data.title,
          required: true,
        },
        {
          type: 'image',
          name: 'myImage',
          label: 'Image goes here',
          defaultValue: data.myImage,
          required: true,
        }
      ],
    };
  },
);
  
Devvit.addMenuItem({
  label: 'Screen Snaps',
  location: 'subreddit',
  onPress: async (_event, context) => {
      context.ui.showForm(myForm);
  },
});

Devvit.addCustomPostType({
  name: 'Screen Snaps',
  description: 'Post your favorite movie screen snaps',
  height: 'tall',
  render: (context) => {
    const { title, myImage } = context.postState;
    return (
      <vstack>
        <text>{title}</text>
        <image url={myImage} />
      </vstack>
    );
  },
});

export default Devvit;