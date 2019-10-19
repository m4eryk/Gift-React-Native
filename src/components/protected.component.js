import React from 'react';

export default function ProtectedComponent(props) {
  return props.role.includes(props.currentRole)
    ? props.children
    : null;
};
