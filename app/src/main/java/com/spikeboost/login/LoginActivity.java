package com.spikeboost.login;

import android.graphics.Paint;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.MenuItem;
import android.view.View;
import android.widget.CompoundButton;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.spikeboost.R;

/**
 * A login screen that offers login via email/password.
 *
 * @author  Spayker
 * @version 1.0
 * @since   3/6/2019
 */
public class LoginActivity extends AppCompatActivity implements View.OnClickListener, TextWatcher,
        CompoundButton.OnCheckedChangeListener {

    // tag field is used for logging sub system to identify from coming logs were created
    private static final String TAG = LoginActivity.class.getSimpleName();

    // UI references.
    private ProgressBar progressBar;


    /**
     * Perform initialization of all fragments of current activity.
     *
     * @param savedInstanceState an instance of Bundle instance
     *                           (A mapping from String keys to various Parcelable values)
     **/
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        setTitle(R.string.login_title_activity);

        progressBar = findViewById(R.id.login_progressBar_cyclic);
        progressBar.setVisibility(View.INVISIBLE);

        // Views
        TextView mForgotPasswordView = findViewById(R.id.forgot_password);
        mForgotPasswordView.setPaintFlags(mForgotPasswordView.getPaintFlags() | Paint.UNDERLINE_TEXT_FLAG);

        // Buttons
        findViewById(R.id.email_sign_in_button).setOnClickListener(this);
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
    public void onClick(View view) {

    }

    @Override
    public void beforeTextChanged(CharSequence s, int start, int count, int after) {
    }

    @Override
    public void afterTextChanged(Editable s) {
    }

    @Override
    public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) { }

    /**
     * Shows progress dialog while backend action is in progress.
     **/
    public void showProgressDialog() {
        progressBar.setVisibility(View.VISIBLE);
    }

    /**
     * Hides progress dialog from screen.
     **/
    public void hideProgressDialog() {
        progressBar.setVisibility(View.INVISIBLE);
    }

    /**
     * Performs Sign In operation.
     *
     * @param login a String object which will be checked during authorization procedure
     * @param password     a String object which will be checked during authorization procedure
     **/
    public void signIn(String login, String password) {

    }

    @Override
    public void onCheckedChanged(CompoundButton compoundButton, boolean b) {

    }

    public void initForgotPasswordCountTimer() {

    }

    public void onForgotPasswordClick(View view) {

    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        return false;
    }

    @Override
    public void onBackPressed() {

    }

}
