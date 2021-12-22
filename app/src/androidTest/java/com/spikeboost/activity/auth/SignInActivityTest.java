package com.spikeboost.activity.auth;

import com.spikeboost.R;
import com.spikeboost.activity.MainActivity;

import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;

import androidx.lifecycle.Lifecycle;
import androidx.test.espresso.Espresso;
import androidx.test.espresso.intent.Intents;
import androidx.test.ext.junit.rules.ActivityScenarioRule;
import androidx.test.ext.junit.runners.AndroidJUnit4;

import static androidx.test.espresso.Espresso.onView;
import static androidx.test.espresso.action.ViewActions.click;
import static androidx.test.espresso.intent.Intents.intended;
import static androidx.test.espresso.intent.matcher.IntentMatchers.hasComponent;
import static androidx.test.espresso.matcher.ViewMatchers.withId;
import static org.junit.Assert.assertEquals;

@RunWith(AndroidJUnit4.class)
public class SignInActivityTest {

    @Rule
    public ActivityScenarioRule<SignInActivity> loginActivityRule =
            new ActivityScenarioRule<>(SignInActivity.class);

    @Before
    public void before() {
        Intents.init();
    }

    @After
    public void after() {
        Intents.release();
    }

    @Test
    public void click_Back_Button_Performs_Exit(){
        Espresso.pressBackUnconditionally();
        assertEquals(Lifecycle.State.CREATED, loginActivityRule.getScenario().getState());
    }

    @Test
    public void click_SignIn_Button_Shows_MainActivity(){
        onView(withId(R.id.email_sign_in_button)).perform(click());
        intended(hasComponent(MainActivity.class.getName()));
    }


}
