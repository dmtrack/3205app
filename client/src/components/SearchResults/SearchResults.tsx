import { AxiosError } from 'axios';
import { IUser } from '../../types/types';
import styles from './SearchResults.module.scss';
import { IValidationError } from '../../hooks/useSearch';

interface SearchResultsProps {
    data: IUser[] | null;
    loading: boolean;
    error?: string | null;
}

const SearchResults = ({ data, error, loading }: SearchResultsProps) => {
    return (
        <div className={styles.results}>
            <ul>
                {data?.map((item, index) => (
                    <li key={index}>
                        Email: {item.email}, Number: {item.number}
                    </li>
                ))}
            </ul>
            <span className={styles.error}>{error}</span>
            {loading && <span className={styles.loading}>Загрузка...</span>}
        </div>
    );
};

export default SearchResults;
