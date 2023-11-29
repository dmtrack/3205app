import { useState } from 'react';
import '../src/styles/App.scss';
import { IUser } from './types/types';
import axios from 'axios';
import Form from './components/Form/Form';
import SearchResults from './components/SearchResults/SearchResults';
import { useSearch } from './hooks/useSearch';

const App = () => {
    const [searchData, setSearchData] = useState<IUser | null>(null);

    const { users, error, isLoading } = useSearch(searchData);
    const onSubmit = (formData: IUser) => {
        setSearchData(formData);
    };
    return (
        <main className='App'>
            <section className='main_container'>
                <Form onSubmit={onSubmit} />
                {isLoading ? (
                    <span>Загрузка...</span>
                ) : (
                    <SearchResults data={users} error={error} />
                )}
            </section>
        </main>
    );
};

export default App;
