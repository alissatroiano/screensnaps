import { Devvit, useState, useForm } from '@devvit/public-api';

Devvit.addCustomPostType({
  name: 'ScreenScraps',
  render: (context) => {
    const [name, setName] = useState('unknown');
    const [image, setImage] = useState('unknown');

    const myForm = useForm(
      {
        fields: [
          {
            type: 'string',
            name: 'name',
            label: 'Name',
          },
          {
            type: 'image', // This tells the form to expect an image
            name: 'myImage',
            label: 'Image goes here',
            required: true,
          }
        ],
      },
      (values) => {
        setName(values.name),
        console.log(values.myImage);
        setImage(values.myImage);
      }
    );

    return (
      <vstack gap="medium" height="100%" alignment="middle center">
        <text>Hello {name}!</text>
        <button
          onPress={() => {
            context.ui.showForm(myForm);
          }}
        >
          Set name
        </button>
      </vstack>
    );
  },
});

export default Devvit;