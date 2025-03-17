import { Devvit, useForm, useState } from '@devvit/public-api';

Devvit.configure({
  redditAPI: true,
  media: true,
  redis: true,
});

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
  label: 'SCREENSCRAPS',
  location: 'subreddit',
  onPress: async (_event, context) => {
      context.ui.showForm(myForm);
  },
});

Devvit.addCustomPostType({
  name: 'my-custom-post',
  render: (context) => {
    return (
      <blocks>
        <image url={'myImage'} imageHeight="320px" imageWidth="320px" />
      </blocks>
    );
  },
});

export default Devvit;