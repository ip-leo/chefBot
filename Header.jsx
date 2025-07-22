import chefLogo from './chef.png';
export default function Header(props) {
    return (
        <header onClick={props.handleReset} style={{ cursor: "pointer" }}>
            <img src={chefLogo} class="thumbnail"/>
            <h1>Chef Bot</h1>
        </header>
    )
}