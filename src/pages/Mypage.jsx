import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { getMyPage } from '../apis/user';
import { useNavigate } from 'react-router-dom';

const Mypage = () => {
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);

    const navigate = useNavigate();
    const handleLogout = () => {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      navigate('/');
    }

    useEffect(() => {
        getMyPage()
        .then((data)=>{
            setData(data);
            setLoading(false);
        }).catch((error)=>{
            alert("토큰 기한 만료");
        });
    },[]);

    if(loading) return <div>loading...</div>;
    
  return (
    <Wrapper>
        <Title>회원 정보</Title>
        <div>회원 이름 : {data.name} </div>
        <div>회원 나이 : {data.age} </div>
        <button onClick={handleLogout}>로그인</button>
    </Wrapper>
  )
}

export default Mypage

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  flex-direction: column;
  border: 3px solid #89cdf6;
  padding: 30px;
  border-radius: 3%;
  font-size: 20px;
  width: 300px;
  div {
    font-size: 25px;
  }
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 700;
  margin-top: 15px;
  margin-bottom: 30px;
  color: #585858;
  font-family: SUITE;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

