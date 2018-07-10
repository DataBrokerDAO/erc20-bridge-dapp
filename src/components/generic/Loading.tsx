/**
 * loading method that handles all react-loadable loaders.
 */
import React from 'react';

export default (props: any) => {
  if (props.error) {
    return (
      <div className="loading">
        Error! <button onClick={props.retry}>Retry</button>
      </div>
    );
  } else if (props.timedOut) {
    return (
      <div className="loading">
        Taking a long time... <button onClick={props.retry}>Retry</button>
      </div>
    );
  } else if (props.pastDelay) {
    return <div className="loading">Loading...</div>;
  } else {
    return null;
  }
};
