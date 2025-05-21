export default function CoinDisplay({ coins = 0, maxCoins = 100, className = "" }) {
    return (
        <div className={`text-yellow-300 font-press text-sm ${className}`}>
            💰 {coins} / {maxCoins}
        </div>
    );
}