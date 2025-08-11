export default function Favorites() {
  const favorites = [
    { id: 1, title: "Favorite Material 1", description: "Description for favorite material 1" },
    { id: 2, title: "Favorite Material 2", description: "Description for favorite material 2" },
    { id: 3, title: "Favorite Material 3", description: "Description for favorite material 3" },
  ];

  return (
    <div className="favorites-container">
      <h2>My Favorites</h2>
      <ul>
        {favorites.map((item) => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
