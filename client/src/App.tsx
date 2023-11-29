import { useState } from 'react';
import { IUser } from './types/types';
import Form from './components/Form/Form';
import SearchResults from './components/SearchResults/SearchResults';
import { useSearch } from './hooks/useSearch';
import styles from './styles/App.module.scss';

const App = () => {
    const [searchData, setSearchData] = useState<IUser | null>(null);

    const { users, error, isLoading } = useSearch(searchData);
    const onSubmit = (formData: IUser) => {
        setSearchData(formData);
    };
    return (
        <main>
            <section className={styles.main_container}>
                <Form onSubmit={onSubmit} />
                <SearchResults data={users} error={error} loading={isLoading} />
            </section>
        </main>
    );
};

export default App;
