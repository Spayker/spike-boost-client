package com.spikeboost.bluetooth;

import android.app.ProgressDialog;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothGatt;
import android.bluetooth.BluetoothManager;
import android.bluetooth.le.BluetoothLeScanner;
import android.bluetooth.le.ScanCallback;
import android.content.Context;
import android.content.Intent;
import android.os.Handler;

import androidx.appcompat.app.AppCompatActivity;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.spikeboost.common.GattCallback;
import com.spikeboost.metric.hr.HeartBeatMeasurer;
import com.spikeboost.metric.hr.HeartBeatMeasurerPackage;

import javax.annotation.Nonnull;

import static android.content.Context.BLUETOOTH_SERVICE;
import static com.spikeboost.common.ModuleStorage.getModuleStorage;

/**
 *  Declares main set of methods which will be used by react UI during data fetching procedure.
 *  Last one includes only device connection. Make sure your miband device has
 *  "Allow 3-rd party connect" option ON
 * @author  Spayker
 * @version 1.0
 * @since   06/01/2019
 */
public class DeviceConnector  extends ReactContextBaseJavaModule {

    // Bluetooth variable section
    private BluetoothGatt bluetoothGatt;
    private BluetoothAdapter bluetoothAdapter;
    private BluetoothDevice bluetoothDevice;
    private GattCallback gattCallback;
    private ProgressDialog searchProgressDialog;

    private Context applicationContext;

    DeviceConnector(ReactApplicationContext reactContext) {
        super(reactContext);

        applicationContext = getReactApplicationContext().getApplicationContext();
        HeartBeatMeasurerPackage hBMeasurerPackage = getModuleStorage().getHeartBeatMeasurerPackage();
        HeartBeatMeasurer heartBeatMeasurer = hBMeasurerPackage.getHeartBeatMeasurer();
        gattCallback = new GattCallback(heartBeatMeasurer);
    }

    /**
     * Enables Bluetooth module on smart phone and starts device discovering process.
     * @param successCallback - a Callback instance that will be needed in the end of discovering
     *                        process to send back a result of work.
     */
    @ReactMethod
    public void enableBTAndDiscover(Callback successCallback) {
        Context mainContext = getReactApplicationContext().getCurrentActivity();
        bluetoothAdapter = ((BluetoothManager) mainContext
                .getSystemService(BLUETOOTH_SERVICE))
                .getAdapter();

        searchProgressDialog = new ProgressDialog(mainContext);
        searchProgressDialog.setIndeterminate(true);
        searchProgressDialog.setTitle("MiBand Bluetooth Scanner");
        searchProgressDialog.setMessage("Searching...");
        searchProgressDialog.setCancelable(false);
        searchProgressDialog.show();

        if (!bluetoothAdapter.isEnabled()) {
            ((AppCompatActivity)mainContext)
                    .startActivityForResult(new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE),
                            1);
        }

        final ScanCallback deviceScanCallback = new DeviceScanCallback(this, successCallback);
        BluetoothLeScanner bluetoothScanner = bluetoothAdapter.getBluetoothLeScanner();
        if(bluetoothScanner != null){
            bluetoothScanner.startScan(deviceScanCallback);
        }

        final int DISCOVERY_TIME_DELAY_IN_MS = 120000;
        new Handler().postDelayed(() -> {
            bluetoothAdapter.getBluetoothLeScanner().stopScan(deviceScanCallback);
            searchProgressDialog.dismiss();
        }, DISCOVERY_TIME_DELAY_IN_MS);
    }

    /**
     * Tries to connect a found miband device with tha app. In case of succeed a bound level value
     * will be send back to be displayed on UI.
     * @param successCallback - a Callback instance that will be needed in the end of discovering
     *                        process to send back a result of work.
     */
    void connectDevice(Callback successCallback) {
        Context mainContext = getReactApplicationContext().getCurrentActivity();
        bluetoothGatt = bluetoothDevice.connectGatt(mainContext, true, gattCallback);
        getModuleStorage().getHeartBeatMeasurerPackage()
                .getHeartBeatMeasurer()
                .updateBluetoothConfig(bluetoothGatt);
        getDeviceBondLevel(successCallback);
    }

    @ReactMethod
    void disconnectDevice(Callback successCallback) {
        bluetoothGatt.disconnect();
        bluetoothGatt = null;
        bluetoothDevice = null;
        bluetoothAdapter = null;
        getDeviceBondLevel(successCallback);
    }

    /**
     * Returns a bluetooth bound level of connection between miband device and android app.
     * Used by react UI part when connection has been established.
     * @param successCallback - a Callback instance that will be needed in the end of discovering
     *                        process to send back a result of work.
     */
    @ReactMethod
    private void getDeviceBondLevel(Callback successCallback){
        if(bluetoothGatt != null){
            successCallback.invoke(null, bluetoothGatt.getDevice().getBondState());
        }
    }

    @Nonnull
    @Override
    public String getName() {
        return DeviceConnector.class.getSimpleName();
    }

    Context getApplicationContext() {
        return applicationContext;
    }

    void setBluetoothDevice(BluetoothDevice bluetoothDevice) {
        this.bluetoothDevice = bluetoothDevice;
    }

    BluetoothAdapter getBluetoothAdapter() {
        return bluetoothAdapter;
    }

    ProgressDialog getSearchProgressDialog() {
        return searchProgressDialog;
    }

}
