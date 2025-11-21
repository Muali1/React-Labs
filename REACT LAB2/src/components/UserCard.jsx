export default function UserCard({ user }) {
  const { username, email, phone, birthdate, role } = user;

  const getRoleStyle = () => {
    const r = role.toLowerCase();
    if (r === "admin") return { background: '#ff4444', color: '#ffffff' };
    if (r === "user") return { background: '#44ff44', color: '#ffffff' };
    if (r === "moderator") return { background: '#ffff44', color: '#333333' };
    return { background: '#cccccc', color: '#333333' };
  };

  return (
    <div className="col-md-6 mb-4">
      <div className="user-card-simple">
        <div className="profile-picture-placeholder"></div>
        <div className="role-chip-simple" style={getRoleStyle()}>
          {role}
        </div>
        <div className="user-info-simple">
          <p className="user-info-text">{username}</p>
          <p className="user-info-text">{email}</p>
          <p className="user-info-text">{phone}</p>
          <p className="user-info-text">{birthdate}</p>
        </div>
      </div>
    </div>
  );
}
