import { styled } from "styled-components";
import { BackIcon } from "./icons/back-icon";
import { useRouter } from "next/navigation";

 const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: var(--secondary-text);
    font-family: inherit;
    font-size: 14px;
    font-weight: 500;
    line-height: 150%;
    border: none;
    background: transparent;
    cursor: pointer;
`

interface ButtonProps {
    navigate: string
}

export function BackButton({navigate}: ButtonProps) {
    const router = useRouter();
    const handleNavigate = () => {
        router.push(navigate)
    }

    return(
        <Button onClick={handleNavigate}>
            <BackIcon />
                Voltar
        </Button>
    )
}