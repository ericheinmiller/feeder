import React from 'react';
import Card from './card';

export default function Feed({ information }) {
  console.log(information);
  const [title, setTitle] = React.useState(null);
  const [items, setItems] = React.useState(null);

  React.useEffect(() => {
    if (information !== null) {
      console.log(information);
      setTitle(information[0].title.text);
      setItems(information[0].item)
    }
  }, [information]);

  return (
    <div className="feed">
      <h2>{title ? title : null}</h2>
    { title ? items.map(item => {
        return <Card />
    }) : <Card title={null} /> }
    </div>
  );
};
