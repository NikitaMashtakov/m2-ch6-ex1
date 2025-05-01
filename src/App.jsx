import { Header } from 'components/Header/Header';
import { Outlet } from 'react-router';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
