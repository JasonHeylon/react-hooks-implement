import { render } from './render';

const React = (function () {
  const hooks = [];
  let hookIndex = 0;

  function useState(initalValue) {
    const state = hooks[hookIndex] || initalValue;
    const _hookIndex = hookIndex;

    const setState = (newValue) => {
      hooks[_hookIndex] = newValue;
    };

    hookIndex += 1;

    return [state, setState];
  }

  function workLoop() {
    hookIndex = 0;
    render(hooks)();
    setTimeout(workLoop, 300);
  }
  setTimeout(workLoop, 300);

  function useEffect(cb, depArray) {
    const oldDeps = hooks[hookIndex];
    let hasChange = true;
    if (oldDeps) {
      hasChange = depArray.some((dep, i) => !Object.is(dep, oldDeps[i]));
    }
    if (hasChange) cb();
    hooks[hookIndex] = depArray;
    hookIndex++;
  }

  function createElement(type, props, ...children) {
    return {
      type,
      props: {
        ...props,
        children: children.map((child) => (typeof child === 'object' ? child : createTextElement(child))),
      },
    };
  }

  function createTextElement(text) {
    return {
      type: 'TEXT_ELEMENT',
      props: {
        nodeValue: text,
        children: [],
      },
    };
  }

  return { useState, render: render(hooks), createElement, useEffect };
})();

export default React;
