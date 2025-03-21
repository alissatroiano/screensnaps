import {Devvit} from '@devvit/public-api'

Devvit.configure({
  redditAPI: true,
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
  label: 'Screen Snaps',
  location: 'subreddit',
  onPress: async (_event, context) => {
      context.ui.showForm(myForm);
      const subreddit = await context.reddit.getSubredditById(context.subredditId);

      await context.reddit.submitPost({
        subredditName: subreddit.name,
        title: 'Custom post!',
        preview: render(context),
      });
    },
  });

const render: Devvit.CustomPostComponent = () => {
  return (
    <vstack padding="medium" gap="medium" cornerRadius="medium">
      <text style="heading" size="xxlarge">
        Hello!
      </text>
      <image url={'myImage'} imageWidth={128} imageHeight={128} />
    </vstack>
  );
};

Devvit.addCustomPostType({
  name: 'Screen Snaps',
  description: 'Test custom post for showing a custom asset!',
  render,
});


export default Devvit;