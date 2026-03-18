import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Rect, G, Text as SvgText, Defs, LinearGradient, Stop } from 'react-native-svg';

const { width } = Dimensions.get('window');
const CHART_WIDTH = width - 40;
const CHART_HEIGHT = 200;
const BAR_WIDTH = 32;
const GAP = (CHART_WIDTH - (BAR_WIDTH * 7)) / 8;

interface DataPoint {
  day: string;
  value: number; // minutes saved
}

const DATA: DataPoint[] = [
  { day: 'Mon', value: 45 },
  { day: 'Tue', value: 80 },
  { day: 'Wed', value: 65 },
  { day: 'Thu', value: 110 },
  { day: 'Fri', value: 95 },
  { day: 'Sat', value: 40 },
  { day: 'Sun', value: 30 },
];

export default function BarChart() {
  const maxValue = Math.max(...DATA.map(d => d.value));
  
  return (
    <View style={styles.container}>
      <Svg width={CHART_WIDTH} height={CHART_HEIGHT + 30}>
        <Defs>
          <LinearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#6D5BFF" stopOpacity="1" />
            <Stop offset="1" stopColor="#A27DFF" stopOpacity="1" />
          </LinearGradient>
        </Defs>

        <G>
          {DATA.map((item, index) => {
            const barHeight = (item.value / maxValue) * CHART_HEIGHT;
            const x = GAP + index * (BAR_WIDTH + GAP);
            const y = CHART_HEIGHT - barHeight;
            
            // Image 4 style: Blue for weekdays, Red for weekend
            const color = index >= 5 ? '#FF6B6B' : '#5B5BD6'; // Updated weekday color to Peak Indigo

            return (
              <G key={item.day}>
                <Rect
                  x={x}
                  y={y}
                  width={BAR_WIDTH}
                  height={barHeight}
                  rx={8}
                  fill={color}
                />
                
                {/* Day label */}
                <SvgText
                  x={x + BAR_WIDTH / 2}
                  y={CHART_HEIGHT + 20}
                  fontSize="12"
                  fill="#999"
                  textAnchor="middle"
                  fontFamily="DMSansMedium" // Updated font family
                >
                  {item.day}
                </SvgText>

                {/* Value tooltip (optional, simple text) */}
                {item.value > 0 && (
                  <SvgText
                    x={x + BAR_WIDTH / 2}
                    y={y - 8}
                    fontSize="10"
                    fill="#8B85CC" // Updated maxValue label color
                    textAnchor="middle"
                    fontFamily="DMSansMedium" // Updated font family
                  >
                    {item.value}m
                  </SvgText>
                )}
              </G>
            );
          })}
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});
