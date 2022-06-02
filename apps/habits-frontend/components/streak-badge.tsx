interface IStreakBadge {
  days: number;
}

const StreakBadge = ({ days }: IStreakBadge) => {
  if (days <= 1) {
    return <></>;
  }

  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 ml-1.5">
      {days} days
    </span>
  );
};

export default StreakBadge;
