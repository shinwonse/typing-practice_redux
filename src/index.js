import { createStore } from 'redux';
import reducer from './reducers/reducer';
import { typeInput } from './actions/action';

const store = createStore(reducer);
store.subscribe(() => {
  startTimerWhenFirst();

  const accuracy = calcAccuracy(store.getState());
  write(accuracyLabel, accuracy);

  const score = calcScore(store.getState());
  write(scoreLabel, score);

  modifyColor(store.getState());
});

const scoreLabel = document.getElementById('score');
const accuracyLabel = document.getElementById('accuracy');
const textInput = document.getElementById('text');
const phraseLabel = document.getElementById('phrase');

let firstTypeTime = null;
const PHRASE = '동해물과 백두산이 마르고 닳도록';

phraseLabel.innerText = PHRASE;

const startTimerWhenFirst = () => (firstTypeTime ??= new Date());

textInput.addEventListener('input', ({ target: { value: inputValue } }) => {
  store.dispatch(typeInput(inputValue));
});

const calcScore = ({ text }) => {
  const currentTime = new Date();
  const elapseTime = (currentTime - firstTypeTime) / 1000;
  if (text.length > 1) {
    return `${(text.length / elapseTime) * 60}타`;
  }
  return '0타';
};

const calcAccuracy = ({ text }) => {
  if (text.length === 0) {
    return '0%';
  }
  return `${
    ([...text].reduce((acc, char, index) => {
      return acc + (char === PHRASE[index] ? 1 : 0);
    }, 0) /
      text.length) *
    100
  }%`;
};

const modifyColor = ({ text }) => {
  phraseLabel.innerHTML = [...PHRASE]
    .map(
      (char, index) =>
        `<span ${text[index] === char && 'style="color: green"'}>${char}</span>`
    )
    .join('');
};

const write = (element, value) => (element.innerText = value);
