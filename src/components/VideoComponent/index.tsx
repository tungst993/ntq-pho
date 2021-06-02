/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, StatusBar, StyleSheet } from 'react-native';
// import Slider from '@react-native-community/slider';
import Slider from 'react-native-slider';
import Video from 'react-native-video';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useRecoilValue } from 'recoil';
import { themeState } from '../../recoil/theme/atoms';
interface VideoProps {
    uri: string;
}
export const VideoComponent = (props: VideoProps) => {
    const { uri } = props;
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [pause, setPause] = useState(false);
    const [onSliding, setOnSliding] = useState(false);
    const [showControl, setShowControl] = useState(true);
    const playVideo = useRef<Video>();
    const [isStop, setStop] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const timeout = React.useRef(0);
    const _oldPause = React.useRef('0');
    const theme = useRecoilValue(themeState);
    const [fullScreen, setFullScreen] = useState(false);

    useEffect(() => {
        setTime();
        return () => {
            clearTimeout(timeout.current);
        };
    }, []);

    useEffect(() => {
        // setPause(true);
    }, []);

    const _renderTime = (seconds: number) => {
        const h = parseInt((seconds / (60 * 60)).toString());
        const m = parseInt(((seconds % (60 * 60)) / 60).toString());
        const s = parseInt((seconds % 60).toString());
        return (h < 10 ? `0${h}` : h) + ':' + (m < 10 ? `0${m}` : m) + ':' + (s < 10 ? `0${s}` : s);
    };

    const setTime = () => {
        clearTimeout(timeout.current);

        timeout.current = setTimeout(() => {
            setShowControl(false);
        }, 3000);
    };

    const _handlePlay = () => {
        if (isStop) {
            setStop(false);
            playVideo?.current?.seek(0);
        }
        setPause(!pause);
        setTime();
    };

    const _handlePrev = () => {
        setStop(false);
        setTime();
        if (Number(currentTime) > 10) {
            playVideo?.current?.seek(currentTime - 10);
        } else {
            playVideo?.current?.seek(0);
        }
    };

    const _handleNext = () => {
        setStop(false);
        setTime();
        if (Number(currentTime) < Number(duration - 10)) {
            playVideo?.current?.seek(currentTime + 10);
        } else {
            playVideo?.current?.seek(duration);
        }
    };

    const _onSlidingStart = () => {
        setTimeout(() => {
            clearTimeout(timeout.current);
            setStop(false);
            setOnSliding(true);
        }, 20);
    };

    const _onSlidingComplete = (value: number) => {
        setTime();
        setOnSliding(false);
        playVideo?.current?.seek(value);
    };

    const _handleZoom = () => {
        setFullScreen(true);
    };

    const _handleShowControl = () => {
        setShowControl(!showControl);
        setTime();
    };

    const _renderVideo = () => {
        return (
            <Video
                source={{ uri: uri }}
                style={styles.video}
                ref={playVideo}
                fullscreen={fullScreen}
                paused={pause || onSliding}
                onProgress={(event) => setCurrentTime(event.currentTime)}
                onSeek={(event) => setCurrentTime(event.currentTime)}
                onFullscreenPlayerDidDismiss={() => setFullScreen(false)}
                fullscreenOrientation={'landscape'}
                onLoad={(event) => {
                    console.log('onload');
                    setLoading(false);
                    if (currentTime <= 0) {
                        if (duration == 0) {
                            if (props.hasOwnProperty('defaultStart')) {
                                // setPause(false);
                            } else {
                                setPause(false);
                            }
                        }
                    } else {
                        playVideo?.current?.seek(currentTime);
                        if (_oldPause.current === '2') {
                            setTimeout(() => {
                                setPause(false);
                            }, 100);
                        }
                    }
                    setDuration(event.duration);
                    _oldPause.current = '0';
                    //
                }}
                onEnd={() => {
                    console.log('onEnd');
                    setPause(true);
                    setStop(true);
                }}
                resizeMode={'none'}
            />
        );
    };

    const _renderControl = () => {
        // if (loading) {
        //     return <View style={styles.viewControl}>
        //         <ActivityIndicator />
        //     </View>;
        // }
        return showControl ? (
            <View style={styles.viewControl}>
                <View style={styles.viewTopControl}>
                    <TouchableOpacity style={styles.buttonNext} onPress={_handlePrev}>
                        <MaterialIcons name="replay-10" size={24} color={'#fff'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonPlay} onPress={_handlePlay}>
                        {pause ? (
                            <MaterialIcons name="play-arrow" size={44} color={'#fff'} />
                        ) : (
                            <MaterialIcons name="pause" size={44} color={'#fff'} />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonNext} onPress={_handleNext}>
                        <MaterialIcons name="forward-10" size={24} color={'#fff'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.viewProcess}>
                    <Text style={styles.textTime}>{_renderTime(currentTime)}</Text>
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={duration}
                        minimumTrackTintColor={'#fff'}
                        maximumTrackTintColor={'#D1D3D4'}
                        thumbTintColor={'#fff'}
                        value={currentTime}
                        onSlidingStart={_onSlidingStart}
                        thumbTouchSize={{ width: 115, height: 115 }}
                        onSlidingComplete={_onSlidingComplete}
                    />
                    <Text style={styles.textTime}>{_renderTime(duration)}</Text>
                    <TouchableOpacity onPress={_handleZoom}>
                        <MaterialIcons name="fullscreen" size={24} color={'#fff'} />
                    </TouchableOpacity>
                </View>
            </View>
        ) : null;
    };

    return (
        <>
            <StatusBar hidden={false} />
            <TouchableWithoutFeedback onPress={_handleShowControl}>
                <View style={[styles.containerVideo]}>
                    {_renderVideo()}
                    {_renderControl()}
                </View>
            </TouchableWithoutFeedback>
        </>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerVideo: {
        // width: '100%',
        backgroundColor: '#000',
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',

    },
    video: {
        width: '100%',
        height: '100%',
    },
    viewControl: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#00000060',
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewTopControl: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonNext: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 7,
    },
    iconNext: {
        width: '70%',
        height: '70%',
        resizeMode: 'contain',
    },
    buttonPlay: {},
    iconPlay: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    viewProcess: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 2,
        justifyContent: 'space-between',
    },
    textTime: {
        fontSize: 14,
        minWidth: 15,
        color: '#fff',
    },
    slider: {
        flex: 1,
        marginRight: 2,
    },
    trackStyle: {
        height: 100,
        width: 10
    },
    thumbStyle: {
        width: 112,
        height: 112,
    },
    buttonZoom: {
        // width: 4,
        // height: 4,
        resizeMode: 'contain',
    },
    containerModal: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#000000',
    },
});
