import { useEffect, useState } from 'react';
import { IUser } from '../types/types';
import axios, { AxiosError } from 'axios';

const url = process.env.REACT_APP_SERVER_URL;
const port = process.env.REACT_APP_SERVER_PORT;

export interface IValidationError {
    value: string;
    msg: string;
    param: string;
    location: string;
}

export const useSearch = (searchData: IUser | null) => {
    const [users, setUsers] = useState<IUser[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const abortController = new AbortController();
        if (!!searchData) {
            setUsers(null);
            setError(null);

            axios
                .post(`${url}:${port}/user`, searchData, {
                    signal: abortController.signal,
                })
                .then((response) => {
                    setUsers(response.data);
                })
                .catch((error) => {
                    if (error?.response?.data.errors) {
                        let validationError =
                            error?.response?.data.errors[0].msg;
                        setError(validationError);
                    } else if (error instanceof AxiosError) {
                        setError(error.response?.data);
                    }
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }

        return () => {
            abortController.abort();
        };
    }, [searchData]);

    return { users, error, isLoading };
};
