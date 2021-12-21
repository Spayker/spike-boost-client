package com.spikeboost.activity.auth;

import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import androidx.test.ext.junit.rules.ActivityScenarioRule;
import androidx.test.ext.junit.runners.AndroidJUnit4;

@RunWith(AndroidJUnit4.class)
public class LoginActivityTest {

    @Rule
    public ActivityScenarioRule<SignInActivity> loginActivityRule =
            new ActivityScenarioRule<>(SignInActivity.class);

    @Test
    public void click_Back_Button_Shows_LoginActivity(){

    }



}
