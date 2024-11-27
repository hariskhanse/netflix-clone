import { useState } from "react";
import { Link } from "react-router-dom";
import FormContainer from "../ReuseComponent/FormContainer";
import Input from "../ReuseComponent/Input";
import Button from "../ReuseComponent/Button";
import { useAuthStore } from "../../store/authUser";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login, isLoggingIn } = useAuthStore();

    const handleLogin = (e) => {
        e.preventDefault();
        login({ email, password });
    };

    return (
        <div className="h-screen w-full hero-bg">
            <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
                <Link to="/">
                    <img className="w-52" src="/assets/images/netflix-logo.png" alt="Netflix" />
                </Link>
            </header>

            <FormContainer title="Login">
                <form className="space-y-4" onSubmit={handleLogin}>
                    <Input
                        label="Email"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                    />
                    <Input
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                    />
                    <Button disabled={isLoggingIn}>
                        {isLoggingIn ? "Loading..." : "Login"}
                    </Button>
                </form>

                <div className="text-center text-gray-400">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-red-500 hover:underline">
                        Sign up now
                    </Link>
                </div>
            </FormContainer>
        </div>
    );
};

export default Login;
