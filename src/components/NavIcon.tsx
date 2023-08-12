import { NavLink } from "react-router-dom";

export default function NavIcon(props: {
  isActive: boolean;
  icon: string;
  to: string;
  label: string;
}) {
  return (
    <NavLink
      to={props.to}
      style={({ isActive }) => ({
        color: isActive ? "#00D208" : "#757575",
      })}
    >
      <div className='flex flex-col items-center'>
        <img
          src={props.icon}
          alt={props.label}
          className={props.isActive ? "text-green-500" : "text-gray-500"}
          width={24}
          height={24}
        />
        <span
          className={
            props.isActive
              ? "mt-1 text-green-500 text-xs"
              : "mt-1 text-gray-500 text-xs"
          }
        >
          {props.label}
        </span>
      </div>
    </NavLink>
  );
}
