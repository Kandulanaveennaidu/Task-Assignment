import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  padding: 1rem;
  color: #fff;
`;

const Button = styled.button`
  background-color: #fff;
  color: #333;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
`;

const UserCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1rem;
  padding: 1rem;
`;

const UserCard = styled.div`
  background-color: #fff;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
`;

const UserCardImage = styled.img`
  width: 100%;
  height: auto;
`;

const UserCardName = styled.h3`
  font-size: 1.5rem;
  margin-top: 1rem;
`;

const UserCardEmail = styled.p`
  font-size: 1rem;
  margin-top: 0.5rem;
  color: #666;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const App = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://reqres.in/api/users?page=1');
      const data = await response.json();
      setUsers(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Navbar>
        <h1>Brand Name</h1>
        <Button onClick={fetchUsers}>Get Users</Button>
      </Navbar>
      {isLoading ? (
        <Loader>
          <p>Loading...</p>
        </Loader>
      ) : (
        <UserCardGrid>
          {users.map((user) => (
            <UserCard key={user.id}>
              <UserCardImage src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
              <UserCardName>{`${user.first_name} ${user.last_name}`}</UserCardName>
              <UserCardEmail>{user.email}</UserCardEmail>
            </UserCard>
          ))}
        </UserCardGrid>
      )}
    </>
  );
};

export default App;
