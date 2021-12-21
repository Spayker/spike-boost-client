package com.spikeboost.sensor;


import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorManager;

import java.util.List;

public class SensorDataGrabber {

    private final Context context;
    private final SensorManager sensorManager;

    public SensorDataGrabber(Context context) {
        this.context = context;
        this.sensorManager = (SensorManager) context.getSystemService(Context.SENSOR_SERVICE);
    }

    public void displayAvailableSensors() {

        final List<Sensor> deviceSensors = sensorManager.getSensorList(Sensor.TYPE_ALL);
        deviceSensors.forEach(System.out::println);

    }

}
