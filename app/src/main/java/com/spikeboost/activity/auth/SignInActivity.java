package com.spikeboost.activity.auth;

import android.content.Intent;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.MenuItem;
import android.view.View;
import android.widget.CompoundButton;

import com.spikeboost.R;
import com.spikeboost.activity.MainActivity;
import com.spikeboost.sensor.SensorDataGrabber;

/**
 * A login screen that offers login via email/password.
 *
 * @author  Spayker
 * @version 1.0
 * @since   12/21/2021
 */
public class SignInActivity extends AppCompatActivity implements View.OnClickListener, TextWatcher,
        CompoundButton.OnCheckedChangeListener {



    /**
     * Perform initialization of all fragments of current activity.
     *
     * @param savedInstanceState an instance of Bundle instance
     *                           (A mapping from String keys to various Parcelable values)
     **/
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signin);
        setTitle(R.string.signin_title_activity);

        // Views
        // TextView mForgotPasswordView = findViewById(R.id.forgot_password);
        // mForgotPasswordView.setPaintFlags(mForgotPasswordView.getPaintFlags() | Paint.UNDERLINE_TEXT_FLAG);

        // Buttons
        // findViewById(R.id.email_sign_in_button).setOnClickListener(this);

        //// business logic init

        // sensor API
        final SensorDataGrabber sensorDataGrabber = new SensorDataGrabber(getApplicationContext());
        sensorDataGrabber.displayAvailableSensors();

    }

    /**
     * Called after onCreate(Bundle) — or after onRestart() when the activity had been stopped,
     * but is now again being displayed to the user. It will be followed by onResume().
     **/
    @Override
    public void onStart() {
        super.onStart();
    }

    /**
     * A callback method to be invoked when a view is clicked.
     *
     * @param view an instance of View class
     *             ( class represents the basic building block for user interface components )
     **/
    @Override
    public void onClick(final View view) {
        final Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
    }

    @Override
    public void beforeTextChanged(CharSequence s, int start, int count, int after) {
    }

    @Override
    public void afterTextChanged(Editable s) {
    }

    @Override
    public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) { }

    @Override
    public void onCheckedChanged(CompoundButton compoundButton, boolean b) {

    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        return false;
    }

    @Override
    public void onBackPressed() {
        final Intent intent = new Intent(Intent.ACTION_MAIN);
        intent.addCategory(Intent.CATEGORY_HOME);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(intent);
    }

}
