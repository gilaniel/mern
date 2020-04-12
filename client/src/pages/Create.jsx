import React, {useState, useContext} from 'react';
import { useHttp } from '../hooks/http.hook';
import {AuthContext} from '../context/auth';
import {useHistory} from 'react-router-dom';

export const Create = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [link, setLink] = useState('');
  const {request} = useHttp()

  const pressHandler = async e => {
    if (e.which === 13) {
      try {
        const data = await request('/api/link/generate', 'POST', {from: link}, {
          'Authorization': 'Bearer ' + auth.token
        });
        history.push(`/detail/${data.link._id}`);
      } catch(e) {}
    }
  }

  return (
    <div className="row">
      <div className="col s8 ofsset-s2" style={{paddingTop: '2rem'}}>
        <div className="input-field">
          <input 
            id="link" 
            type="text" 
            value={link}
            onChange={e => setLink(e.target.value)}
            onKeyPress={pressHandler}
            />
          <label htmlFor="link" className="white-text">Link</label>
        </div>
      </div>
    </div>
  )
}