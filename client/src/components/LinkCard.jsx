import React from 'react';

export const LinkCard = ({link}) => {
  return (
    <div>
      <h2>Link</h2>
      <p>Short: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
      <p>From: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
      <p>Click count: {link.clicks}</p>
      <p>Date: {new Date(link.date).toLocaleDateString()}</p>
    </div>
  )
}