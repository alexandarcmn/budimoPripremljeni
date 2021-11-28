import React from 'react'
import { View } from 'react-native'
import OnboardingMain from '../../components/Onboarding';

const Onboarding = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <OnboardingMain navigation={navigation} />
        </View>
    )
}

export default Onboarding;
