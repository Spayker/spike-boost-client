package com.spikeboost.activity.auth;

import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;

import androidx.lifecycle.Lifecycle;
import androidx.test.espresso.Espresso;
import androidx.test.ext.junit.rules.ActivityScenarioRule;
import androidx.test.ext.junit.runners.AndroidJUnit4;

import static org.junit.Assert.assertEquals;

@RunWith(AndroidJUnit4.class)
public class SignInActivityTest {

    @Rule
    public ActivityScenarioRule<SignInActivity> loginActivityRule =
            new ActivityScenarioRule<>(SignInActivity.class);

    @Test
    public void click_Back_Button_Performs_Exit(){
        Espresso.pressBackUnconditionally();
        assertEquals(Lifecycle.State.CREATED, loginActivityRule.getScenario().getState());
    }



}
