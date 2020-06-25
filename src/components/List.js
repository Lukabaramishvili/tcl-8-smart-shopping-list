import React from 'react';
import { FirestoreCollection, withFirestore } from 'react-firestore';
import '../styles/List.css';

const List = ({ firestore }) => {
  const token = localStorage.getItem('userToken');

  const handleChange = (e, item) => {
    e.preventDefault();
    const purchased = item.numberOfPurchases;
    if (e.target.checked) {
      firestore
        .collection('shoppingList')
        .doc(item.id)
        .update({
          numberOfPurchases: purchased + 1,
        });
    }
  };
  return (
    <FirestoreCollection
      path="shoppingList"
      filter={['token', '==', token]}
      render={({ isLoading, data }) => {
        return isLoading ? (
          <p>loading...</p>
        ) : (
          <div className="list">
            <ul style={{ listStyleType: 'none' }}>
              {data.map(item => (
                <li key={item.id}>
                  <input
                    type="checkbox"
                    defaultChecked="true"
                    onChange={e => handleChange(e, item)}
                  />
                  <span>
                    {item.name} - next purchase in {item.nextPurchase} days{' '}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );
      }}
    />
  );
};

export default withFirestore(List);
