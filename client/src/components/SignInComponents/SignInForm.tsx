import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/api/authCall';
import { Button, Input, FormControl, FormLabel, Container, Box, Heading, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const SignInForm = (): React.JSX.Element => {
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();

    const [loginFormState, setLoginFormState] = useState({
        login: '',
        password: ''
    });

    const handleLoginForm = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;

        setLoginFormState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await dispatch(login(loginFormState));
            navigate('/', { replace: true });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container maxW="sm">
            <Box mt={8} p={6} borderWidth={1} borderRadius="lg">
                <Heading mb={4} textAlign="center">
                    Sign In
                </Heading>
                <form onSubmit={handleSubmit}>
                    <FormControl>
                        <FormLabel>Username</FormLabel>
                        <Input type="login" name="login" required value={loginFormState.login} onChange={handleLoginForm} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            name="password"
                            required
                            value={loginFormState.password}
                            onChange={handleLoginForm}
                        />
                    </FormControl>
                    <Button type="submit" colorScheme="teal" mt={4}>
                        Sign In
                    </Button>
                    <Box mt={2} textAlign="right">
                        <Link color="teal.500" href="#">
                            Forgot Password?
                        </Link>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default SignInForm;
