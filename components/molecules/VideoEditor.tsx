import type { InputBaseComponentProps } from "@mui/material/InputBase";
import makeStyles from "@mui/styles/makeStyles";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import PlayIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import TextField from "$atoms/TextField";
import IconButton from "$atoms/IconButton";
import SkipButton from "$molecules/SkipButton";

const label = {
  start: "再生開始位置の設定",
  end: "再生終了位置の設定",
  play: "再生",
  pause: "一時停止",
} as const;

type Props = {
  startTimeInputProps: InputBaseComponentProps;
  stopTimeInputProps: InputBaseComponentProps;
  startTimeMax: number;
  stopTimeMin: number;
  stopTimeMax: number;
  startTimeError: boolean;
  stopTimeError: boolean;
  paused: boolean;
  onSetStartTime(): void | Promise<void>;
  onSetStopTime(): void | Promise<void>;
  onSeekToStart(): void | Promise<void>;
  onSeekToEnd(): void | Promise<void>;
  onStartTimeStopTimeChange(): void | Promise<void>;
  onTogglePause(): void | Promise<void>;
};

const useStyles = makeStyles((theme) => ({
  videoController: {
    display: "flex",
    marginTop: theme.spacing(1),
    justifyContent: "space-around",
  },
  rangeController: {
    display: "flex",
    justifyContent: "space-between",
    gap: "calc(100% / 3)",
  },
}));

export default function VideoEditor(props: Props) {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.videoController}>
        <Button
          variant="outlined"
          color="primary"
          onClick={props.onSetStartTime}
        >
          {label.start}
        </Button>
        <SkipButton
          variant="start"
          color="primary"
          onClick={props.onSeekToStart}
        />
        <IconButton
          tooltipProps={{
            title: label[props.paused ? "play" : "pause"],
          }}
          color="primary"
          onClick={props.onTogglePause}
        >
          {props.paused ? <PlayIcon /> : <PauseIcon />}
        </IconButton>
        <SkipButton variant="end" color="primary" onClick={props.onSeekToEnd} />
        <Button
          variant="outlined"
          color="primary"
          onClick={props.onSetStopTime}
        >
          {label.end}
        </Button>
      </div>
      <div className={classes.rangeController}>
        <TextField
          type="number"
          fullWidth
          inputProps={{
            ...props.startTimeInputProps,
            step: 0.001,
            min: 0,
            max: props.startTimeMax,
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end">秒</InputAdornment>,
          }}
          error={props.startTimeError}
          onChange={props.onStartTimeStopTimeChange}
        />
        <TextField
          type="number"
          fullWidth
          inputProps={{
            ...props.stopTimeInputProps,
            step: 0.001,
            min: props.stopTimeMin,
            max: props.stopTimeMax,
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end">秒</InputAdornment>,
          }}
          error={props.stopTimeError}
          onChange={props.onStartTimeStopTimeChange}
        />
      </div>
    </div>
  );
}
