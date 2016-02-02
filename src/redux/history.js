import createBrowserHistory from 'history/lib/createBrowserHistory';

let history = null;
export default function getHistory() {
  if (!history) {
    history = createBrowserHistory();
  }
  return history;
}
