import profilepic from "../../assets/ProfilePicture.png";

const Profile = () => {
  return (
    <div className="relative size-80 lg:size-96">
      <svg
        fill="currentColor"
        stroke="currentColor"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 368.935 368.935"
        className="absolute top-0 left-0 z-1"
      >
        <g>
          <path
            d="M330.835,0C130.884,155.665,85.659,39.304,85.659,39.304c-113.127,128.764,0,246.284,0,246.284
      c199.953-78.446,44.039,83.347,44.039,83.347C372.496,355.46,330.835,0,330.835,0z"
          />
        </g>
      </svg>
      <img
        src={profilepic}
        alt="Profile Picture"
        className="absolute top-0 left-0 z-2"
      />
    </div>
  );
};

export default Profile;
