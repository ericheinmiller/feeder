import React from 'react';
import convert from 'xml-js';
import Feed from '../components/feed';
import '../style/index.scss';

const config = {
  compact: true,
  ignoreAttributes: true,
  ignoreDeclaration: true,
}
export default function App() {
  const [feeds, setFeeds] = React.useState(null);
  React.useEffect(() => {
    Promise.all([
      fetch('/tech').then(res => res.text()).then(data => convert.xml2js(data, config).rss.channel),
      fetch('/medium').then(res => res.text()).then(data => convert.xml2js(data, config).rss.channel),
      fetch('/test').then(res => res.text()).then(data => convert.xml2js(data, config).rss.channel),
    ]).then(results => {
      setFeeds([
        ...results
      ])
    });
    },[]);
  console.log(feeds);
  return (
    <div className="app">
      <div className="nav">
        Hi
      </div>
      <Feed information={feeds}/>
    </div>
  );
}
