import { SearchBar } from 'components/SearchBar/SearchBar';
import { Selector } from 'components/Selector/Selector';
import { OPTIONS } from 'constants/sortingOptions';
import styles from './Toolbar.module.css';
import PropTypes from 'prop-types';

export const Toolbar = ({ search, searchHandler, selectorHandler }) => {
  return (
    <div className={styles.container}>
      <SearchBar
        className={styles.search}
        search={search}
        searchHandler={searchHandler}
      />
      <Selector
        label={'Сортировка'}
        selectorId={'sortingSelector'}
        options={OPTIONS}
        setSelected={selectorHandler}
      />
    </div>
  );
};

Toolbar.propTypes = {
  search: PropTypes.string,
  searchHandler: PropTypes.func,
  selectorHandler: PropTypes.func,
};
