import { Box, Flex, Text, Button, Heading, ScrollArea } from '@radix-ui/themes';
import { Pencil } from 'lucide-react';
import { useEdit } from '../context/EditContext';

export function CaseStudyContent() {
    const { setEditMode } = useEdit();

    return (
        <Box style={{ flex: 1, overflow: 'hidden', backgroundColor: 'white' }}>
            <ScrollArea style={{ height: '100%' }}>
                <Box style={{ maxWidth: 720, margin: '0 auto', padding: '32px' }}>
                    {/* Category label */}
                    <Text size="2" weight="medium" style={{ color: '#f97316' }}>
                        Case Study
                    </Text>

                    {/* Title with Edit button */}
                    <Flex justify="between" align="start" mt="2" mb="4">
                        <Heading size="7" weight="bold" style={{ color: '#111827', lineHeight: 1.2 }}>
                            Hero Vida EICMA 2025 Case Study
                        </Heading>
                        <Button
                            variant="outline"
                            size="2"
                            onClick={() => setEditMode(true)}
                            style={{
                                borderColor: '#d1d5db',
                                color: '#4b5563',
                                cursor: 'pointer'
                            }}
                            className="hover:border-orange-500 hover:text-orange-500 hover:bg-orange-50 transition-all"
                        >
                            <Pencil size={14} />
                            <Text size="2" weight="medium">Edit</Text>
                        </Button>
                    </Flex>

                    {/* Subtitle */}
                    <Text as="p" size="3" style={{ color: '#4b5563', lineHeight: 1.6, marginBottom: 32 }}>
                        Bringing Hero VIDA's electric mobility lineup to life through interactive screens at one of the most talked-about automotive events in the world
                    </Text>

                    {/* INTRO Section */}
                    <Box id="intro" mb="6">
                        <Heading size="5" weight="bold" mb="3" style={{ color: '#111827' }}>
                            INTRO
                        </Heading>
                        <Flex direction="column" gap="3">
                            <Text as="p" size="3" style={{ color: '#374151', lineHeight: 1.7 }}>
                                EICMA is the world's largest stage for two-wheeler innovation. The annual gathering in Milan is an opportunity for global manufacturers to unveil new models, technology, and accessories to an audience of passionate gear-heads and curious visitors.
                            </Text>
                            <Text as="p" size="3" style={{ color: '#374151', lineHeight: 1.7 }}>
                                The event attracts large crowds that move fast. Machines glow under bright spotlights and every brand is fighting for a moment of attention. Hero VIDA had to capitalise on this moment not just with their standout lineup of two-wheelers, but also with screens and marketing materials that invited attendees to understand the products at a deeper level.
                            </Text>
                        </Flex>
                    </Box>

                    {/* CHALLENGE Section */}
                    <Box id="challenge" mb="6">
                        <Heading size="5" weight="bold" mb="3" style={{ color: '#111827' }}>
                            CHALLENGE
                        </Heading>
                        <Flex direction="column" gap="3">
                            <Text as="p" size="3" style={{ color: '#374151', lineHeight: 1.7 }}>
                                Hero VIDA needed a set of on-device product screens to spotlight their electric two-wheelers at EICMA. Each screen had to give visitors a quick, intuitive way to explore every model's features, specs, and personality, all within the rhythm of a fast-moving trade show.
                            </Text>
                            <Text as="p" size="3" style={{ color: '#374151', lineHeight: 1.7 }}>
                                In previous years, attendees often left the webpages scrolled to the end, meaning the next visitor saw incomplete or confusing information. The audience added another layer of complexity. Most visitors aren't tech-forward, so interactions needed to be visually clear, intuitive, and impossible to miss.
                            </Text>
                            <Text as="p" size="3" style={{ color: '#374151', lineHeight: 1.7 }}>
                                ownpath Studios was tasked with transforming static information on each model into an engaging experience that could stand out amidst the hubbub of the world's biggest mobility showcase. The goal was to surface all key details while keeping the interface elegant, accessible, and perfectly aligned with Hero VIDA's brand identity.
                            </Text>
                        </Flex>
                    </Box>

                    {/* OUR APPROACH Section */}
                    <Box id="our-approach" mb="6">
                        <Heading size="5" weight="bold" mb="3" style={{ color: '#111827' }}>
                            OUR APPROACH
                        </Heading>
                        <Flex direction="column" gap="3">
                            <Text as="p" size="3" style={{ color: '#374151', lineHeight: 1.7 }}>
                                We started by mapping out the visitor journey at a typical trade show booth. Understanding that attention spans are short and competition for eyeballs is fierce, we designed an interface that could communicate value within seconds while offering depth for those who wanted to explore further.
                            </Text>
                            <Text as="p" size="3" style={{ color: '#374151', lineHeight: 1.7 }}>
                                The design language drew heavily from Hero VIDA's existing brand guidelines, incorporating their signature colors, typography, and visual motifs. We created a modular system of cards and panels that could be rearranged based on the specific model being showcased, ensuring consistency while allowing for product-specific customization.
                            </Text>
                        </Flex>
                    </Box>

                    {/* METHOD1 Section */}
                    <Box id="method1" mb="6">
                        <Heading size="5" weight="bold" mb="3" style={{ color: '#111827' }}>
                            METHOD1
                        </Heading>
                        <Flex direction="column" gap="3">
                            <Text as="p" size="3" style={{ color: '#374151', lineHeight: 1.7 }}>
                                Our first methodology focused on progressive disclosure. Rather than overwhelming visitors with specifications and features upfront, we created an interactive hierarchy where the most compelling information—range, top speed, charging time—appeared immediately, with deeper technical details available through intuitive gestures.
                            </Text>
                            <Text as="p" size="3" style={{ color: '#374151', lineHeight: 1.7 }}>
                                We implemented auto-reset functionality that would return the screen to its initial state after a period of inactivity, solving the problem of visitors leaving pages in unpredictable states. Subtle animations guided users through the interface without feeling intrusive or gimmicky.
                            </Text>
                        </Flex>
                    </Box>
                </Box>
            </ScrollArea>
        </Box>
    );
}
