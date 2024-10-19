import makeStyles from "@mui/styles/makeStyles";
import Tooltip from "@mui/material/Tooltip";
import LearningStatusDot from "$atoms/LearningStatusDot";
import getLocaleEntries from "$utils/bookLearningActivity/getLocaleEntries";
import type { BookActivitySchema } from "$server/models/bookActivity";
import type { SessionSchema } from "$server/models/session";
import type { ActivityRewatchRateProps } from "$server/validators/activityRewatchRate";

const useStyles = makeStyles((theme) => ({
  button: {
    appearance: "none",
    border: "none",
    background: "transparent",
    padding: 0,
    cursor: "pointer",
  },
  descriptionList: {
    "& > div": {
      display: "flex",
      flexWrap: "wrap",
      margin: theme.spacing(0.5, 0),
    },
    "& dt, & dd": {
      margin: 0,
    },
  },
  delimiter: {
    marginRight: theme.spacing(0.5),
  },
}));

type Props = {
  activity: BookActivitySchema;
  onActivityClick?(activity: BookActivitySchema): void;
  session: SessionSchema;
  rewatchRate: ActivityRewatchRateProps | undefined;
};

function isRewatched(rewatchRate: number) {
  return rewatchRate >= 0.3;
}

export default function LearnerActivityDot(props: Props) {
  const { activity, onActivityClick, session, rewatchRate } = props;
  const classes = useStyles();
  const handleActivityClick = () => onActivityClick?.(activity);
  const items = Object.entries(
    getLocaleEntries(activity, rewatchRate, session)
  );

  const rewatchLabel = isRewatched(rewatchRate?.rewatchRate ?? 0)
    ? "rewatch"
    : "default";

  return (
    <Tooltip
      title={
        <dl className={classes.descriptionList}>
          {items.map(([key, value], index) => (
            <div key={index}>
              <dt>
                {key}
                <span className={classes.delimiter} aria-hidden>
                  :
                </span>
              </dt>
              <dd>{key === "ユーザ名" && !value ? "名前未公開" : value}</dd>
            </div>
          ))}
        </dl>
      }
      arrow
    >
      <button className={classes.button} onClick={handleActivityClick}>
        <LearningStatusDot
          status={activity.status}
          size="large"
          isRewatched={rewatchLabel}
        />
      </button>
    </Tooltip>
  );
}
