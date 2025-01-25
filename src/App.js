import React, { useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import './App.css';

import Themes from 'pages/Themes';
import Register from 'pages/Register';
import Congraturation from 'pages/Congraturation';
import { OceanWave, MountainView, RainyBeach } from 'pages/Themes';
import Layout from 'components/Layout/Layout';

import axios from 'axios';

function App() {
  const location = useLocation();
  const userName = localStorage.getItem('name');
  const [meditationThought, setMeditationThought] = useState('');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // 生成冥想思考的函数
  const fetchMeditationThought = async () => {
    if (!input.trim()) {
      alert("请输入冥想主题");
      return;
    }
    setLoading(true);
    setMeditationThought('');

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: `Generate a meditation thought about: ${input}` }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );

      setMeditationThought(response.data.choices[0].message.content.trim());
    } catch (error) {
      console.error('Error generating meditation thought:', error);
      setMeditationThought('无法生成冥想思考，请稍后重试。');
    }
    setLoading(false);
  };

  let route;
  if (!userName) {
    route = <Route exact path="/" component={Register} />;
  } else {
    route = (
      <>
        <Route exact path="/" component={Themes} />
        <Route path="/ocean" component={OceanWave} />
        <Route path="/mountain" component={MountainView} />
        <Route path="/rainy" component={RainyBeach} />
        <Route path="/congraturation" component={Congraturation} />
      </>
    );
  }

  return (
    <div className="App">
      <Layout>
        <Switch location={location}>{route}</Switch>
        
        {/* 冥想思考生成功能 */}
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h2>生成冥想思考</h2>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入冥想主题，例如 '平静'"
            style={{ padding: '10px', width: '300px' }}
          />
          <button 
            onClick={fetchMeditationThought} 
            style={{ marginLeft: '10px', padding: '10px 20px' }}
            disabled={loading}
          >
            {loading ? '生成中...' : '生成'}
          </button>
          {meditationThought && (
            <div style={{ marginTop: '20px', fontSize: '20px', fontStyle: 'italic' }}>
              <h3>生成的冥想思考：</h3>
              <p>{meditationThought}</p>
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
}

export default App;
