﻿// Xbox Project Shim Services
var EnableXboxLiveServices = true;

// Verizon-TechWeek-3D.js
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var PROJECT;
(function (PROJECT) {
    /**
     * Babylon universal camera rig system pro class
     * @class UniversalCameraSystem - All rights reserved (c) 2020 Mackey Kinard
     */
    var UniversalCameraSystem = /** @class */ (function (_super) {
        __extends(UniversalCameraSystem, _super);
        function UniversalCameraSystem() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.mainCamera = false;
            _this.cameraType = 0;
            _this.cameraInertia = 0.5;
            _this.cameraController = null;
            _this.virtualReality = null;
            _this.arcRotateConfig = null;
            _this.multiPlayerSetup = null;
            _this.editorPostProcessing = null;
            _this.m_cameraRig = null;
            return _this;
        }
        UniversalCameraSystem.GetRenderingPipeline = function () { return PROJECT.UniversalCameraSystem.renderingPipeline; };
        ;
        UniversalCameraSystem.IsCameraSystemReady = function () { return PROJECT.UniversalCameraSystem.cameraReady; };
        UniversalCameraSystem.prototype.isMainCamera = function () { return this.mainCamera; };
        UniversalCameraSystem.prototype.getCameraType = function () { return this.cameraType; };
        UniversalCameraSystem.prototype.awake = function () { this.awakeCameraSystemState(); };
        UniversalCameraSystem.prototype.start = function () { this.startCameraSystemState(); };
        UniversalCameraSystem.prototype.update = function () { this.updateCameraSystemState(); };
        UniversalCameraSystem.prototype.destroy = function () { this.destroyCameraSystemState(); };
        /////////////////////////////////////////////
        // Universal Camera System State Functions //
        /////////////////////////////////////////////
        UniversalCameraSystem.prototype.awakeCameraSystemState = function () {
            this.mainCamera = (this.getTransformTag() === "MainCamera");
            this.cameraType = this.getProperty("mainCameraType", this.cameraType);
            this.cameraInertia = this.getProperty("setCameraInertia", this.cameraInertia);
            this.virtualReality = this.getProperty("virtualRealityRig", this.virtualReality);
            this.arcRotateConfig = this.getProperty("arcRotateConfig", this.arcRotateConfig);
            this.multiPlayerSetup = this.getProperty("multiPlayerSetup", this.multiPlayerSetup);
            this.cameraController = this.getProperty("cameraController", this.cameraController);
            this.editorPostProcessing = this.getProperty("renderingPipeline", this.editorPostProcessing);
        };
        UniversalCameraSystem.prototype.startCameraSystemState = function () {
            return __awaiter(this, void 0, void 0, function () {
                var webvrFloorMeshes, webvrHelperOptions, webvrImmersiveMode, webvrReferenceType, _a, cameraName, playerOneTransform, playerOneName, playerOneCamerax, playerTwoTransform, playerTwoName, playerTwoCamerax, playerThreeTransform, playerThreeName, playerThreeCamerax, playerFourTransform, playerFourName, playerFourCamerax, targetVector, defaultPipeline, colorGradingTexture, curve;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            BABYLON.Utilities.ValidateTransformQuaternion(this.transform);
                            if (this.multiPlayerSetup != null) {
                                PROJECT.UniversalCameraSystem.startupMode = this.multiPlayerSetup.playerStartupMode;
                                PROJECT.UniversalCameraSystem.stereoCameras = this.multiPlayerSetup.stereoSideBySide;
                            }
                            // ..
                            // Default Camera System Support
                            // ..
                            this.m_cameraRig = this.getCameraRig();
                            if (!(this.m_cameraRig != null)) return [3 /*break*/, 5];
                            this.m_cameraRig.inertia = this.cameraInertia;
                            if (this.cameraController.attachControl === true) {
                                this.m_cameraRig.parent = null; // Detach Camera Parent When Attaching Control
                                this.m_cameraRig.position.copyFrom(this.transform.position);
                                this.m_cameraRig.rotationQuaternion = (this.transform.rotationQuaternion != null) ? this.transform.rotationQuaternion.clone() : BABYLON.Quaternion.FromEulerAngles(this.transform.rotation.x, this.transform.rotation.y, this.transform.rotation.z);
                                if (this.m_cameraRig instanceof BABYLON.FreeCamera) {
                                    this.m_cameraRig.checkCollisions = this.cameraController.checkCollisions;
                                    this.m_cameraRig.applyGravity = this.cameraController.setApplyGravity;
                                }
                                this.m_cameraRig.attachControl(this.cameraController.preventDefault);
                            }
                            if (!(this.cameraType === 0)) return [3 /*break*/, 1];
                            //if (PROJECT.UniversalCameraSystem.PlayerOneCamera == null) {
                            PROJECT.UniversalCameraSystem.PlayerOneCamera = this.m_cameraRig;
                            PROJECT.UniversalCameraSystem.PlayerOneCamera.inertia = this.cameraInertia;
                            PROJECT.UniversalCameraSystem.PlayerOneCamera.transform = this.transform;
                            return [3 /*break*/, 5];
                        case 1:
                            if (!(this.cameraType === 1)) return [3 /*break*/, 4];
                            if (!(this.virtualReality != null)) return [3 /*break*/, 3];
                            webvrFloorMeshes = null;
                            webvrHelperOptions = null;
                            webvrImmersiveMode = (this.virtualReality.immersiveExperience === 1) ? "immersive-ar" : "immersive-vr";
                            webvrReferenceType = "local-floor";
                            switch (this.virtualReality.referenceSpaceType) {
                                case 0:
                                    webvrReferenceType = "viewer";
                                    break;
                                case 1:
                                    webvrReferenceType = "local";
                                    break;
                                case 2:
                                    webvrReferenceType = "local-floor";
                                    break;
                                case 3:
                                    webvrReferenceType = "bounded-floor";
                                    break;
                                case 4:
                                    webvrReferenceType = "unbounded";
                                    break;
                                default:
                                    webvrReferenceType = "local-floor";
                                    break;
                            }
                            if (this.virtualReality.setFloorMeshesTags == null || this.virtualReality.setFloorMeshesTags === "")
                                this.virtualReality.setFloorMeshesTags = "Navigation";
                            if (this.virtualReality.enableTeleportation === true)
                                webvrFloorMeshes = this.scene.getMeshesByTags(this.virtualReality.setFloorMeshesTags);
                            if (this.virtualReality.enableTeleportation === true && webvrFloorMeshes != null && webvrFloorMeshes.length > 0) {
                                webvrHelperOptions = {
                                    floorMeshes: webvrFloorMeshes,
                                    renderingGroupId: this.virtualReality.renderingGroupNum,
                                    disableDefaultUI: this.virtualReality.disableUserInterface,
                                    disableTeleportation: (this.virtualReality.enableTeleportation === false),
                                    ignoreNativeCameraTransformation: this.virtualReality.ignoreNativeCamera,
                                    inputOptions: {
                                        doNotLoadControllerMeshes: this.virtualReality.experienceInputOptions.disableMeshLoad,
                                        forceInputProfile: this.virtualReality.experienceInputOptions.forceInputProfile,
                                        disableOnlineControllerRepository: this.virtualReality.experienceInputOptions.disableRepository,
                                        customControllersRepositoryURL: this.virtualReality.experienceInputOptions.customRepository,
                                        disableControllerAnimation: this.virtualReality.experienceInputOptions.disableModelAnim,
                                        controllerOptions: {
                                            disableMotionControllerAnimation: this.virtualReality.experienceInputOptions.controllerOptions.disableCtrlAnim,
                                            doNotLoadControllerMesh: this.virtualReality.experienceInputOptions.controllerOptions.disableCtrlMesh,
                                            forceControllerProfile: this.virtualReality.experienceInputOptions.controllerOptions.forceCtrlProfile,
                                            renderingGroupId: this.virtualReality.experienceInputOptions.controllerOptions.renderingGroup
                                        }
                                    },
                                    uiOptions: {
                                        sessionMode: webvrImmersiveMode,
                                        referenceSpaceType: webvrReferenceType
                                    }
                                };
                            }
                            else {
                                webvrHelperOptions = {
                                    renderingGroupId: this.virtualReality.renderingGroupNum,
                                    disableDefaultUI: this.virtualReality.disableUserInterface,
                                    disableTeleportation: (this.virtualReality.enableTeleportation === false),
                                    ignoreNativeCameraTransformation: this.virtualReality.ignoreNativeCamera,
                                    inputOptions: {
                                        doNotLoadControllerMeshes: this.virtualReality.experienceInputOptions.disableMeshLoad,
                                        forceInputProfile: this.virtualReality.experienceInputOptions.forceInputProfile,
                                        disableOnlineControllerRepository: this.virtualReality.experienceInputOptions.disableRepository,
                                        customControllersRepositoryURL: this.virtualReality.experienceInputOptions.customRepository,
                                        disableControllerAnimation: this.virtualReality.experienceInputOptions.disableModelAnim,
                                        controllerOptions: {
                                            disableMotionControllerAnimation: this.virtualReality.experienceInputOptions.controllerOptions.disableCtrlAnim,
                                            doNotLoadControllerMesh: this.virtualReality.experienceInputOptions.controllerOptions.disableCtrlMesh,
                                            forceControllerProfile: this.virtualReality.experienceInputOptions.controllerOptions.forceCtrlProfile,
                                            renderingGroupId: this.virtualReality.experienceInputOptions.controllerOptions.renderingGroup
                                        }
                                    },
                                    uiOptions: {
                                        sessionMode: webvrImmersiveMode,
                                        referenceSpaceType: webvrReferenceType
                                    }
                                };
                            }
                            _a = PROJECT.UniversalCameraSystem;
                            return [4 /*yield*/, this.scene.createDefaultXRExperienceAsync(webvrHelperOptions)];
                        case 2:
                            _a.XRExperienceHelper = _b.sent();
                            if (!PROJECT.UniversalCameraSystem.XRExperienceHelper.baseExperience) {
                                BABYLON.Tools.Warn("WebXR not supported in current browser.");
                            }
                            _b.label = 3;
                        case 3: return [3 /*break*/, 5];
                        case 4:
                            if (this.cameraType === 2) { // Multi Player Camera
                                cameraName = this.m_cameraRig.name;
                                playerOneTransform = new BABYLON.TransformNode("Player Camera 1", this.scene);
                                playerOneTransform.rotationQuaternion = this.transform.rotationQuaternion.clone();
                                playerOneTransform.position = this.transform.position.clone();
                                playerOneTransform.parent = this.transform.parent;
                                playerOneName = cameraName + ".1";
                                playerOneCamerax = this.m_cameraRig.clone(playerOneName);
                                playerOneCamerax.name = playerOneName;
                                playerOneCamerax.parent = playerOneTransform;
                                playerOneCamerax.position = new BABYLON.Vector3(0, 0, 0);
                                playerOneCamerax.rotationQuaternion = new BABYLON.Quaternion(0, 0, 0, 1);
                                playerOneCamerax.viewport = new BABYLON.Viewport(0, 0, 0, 0);
                                playerOneCamerax.setEnabled(false);
                                PROJECT.UniversalCameraSystem.PlayerOneCamera = playerOneCamerax;
                                PROJECT.UniversalCameraSystem.PlayerOneCamera.inertia = this.cameraInertia;
                                PROJECT.UniversalCameraSystem.PlayerOneCamera.transform = playerOneTransform;
                                playerOneTransform.cameraRig = PROJECT.UniversalCameraSystem.PlayerOneCamera;
                                playerTwoTransform = new BABYLON.TransformNode("Player Camera 2", this.scene);
                                playerTwoTransform.rotationQuaternion = this.transform.rotationQuaternion.clone();
                                playerTwoTransform.position = this.transform.position.clone();
                                playerTwoTransform.parent = this.transform.parent;
                                playerTwoName = cameraName + ".2";
                                playerTwoCamerax = this.m_cameraRig.clone(playerTwoName);
                                playerTwoCamerax.name = playerTwoName;
                                playerTwoCamerax.parent = playerTwoTransform;
                                playerTwoCamerax.position = new BABYLON.Vector3(0, 0, 0);
                                playerTwoCamerax.rotationQuaternion = new BABYLON.Quaternion(0, 0, 0, 1);
                                playerTwoCamerax.viewport = new BABYLON.Viewport(0, 0, 0, 0);
                                playerTwoCamerax.setEnabled(false);
                                PROJECT.UniversalCameraSystem.PlayerTwoCamera = playerTwoCamerax;
                                PROJECT.UniversalCameraSystem.PlayerTwoCamera.inertia = this.cameraInertia;
                                PROJECT.UniversalCameraSystem.PlayerTwoCamera.transform = playerTwoTransform;
                                playerTwoTransform.cameraRig = PROJECT.UniversalCameraSystem.PlayerTwoCamera;
                                playerThreeTransform = new BABYLON.TransformNode("Player Camera 3", this.scene);
                                playerThreeTransform.rotationQuaternion = this.transform.rotationQuaternion.clone();
                                playerThreeTransform.position = this.transform.position.clone();
                                playerThreeTransform.parent = this.transform.parent;
                                playerThreeName = cameraName + ".3";
                                playerThreeCamerax = this.m_cameraRig.clone(playerThreeName);
                                playerThreeCamerax.name = playerThreeName;
                                playerThreeCamerax.parent = playerThreeTransform;
                                playerThreeCamerax.position = new BABYLON.Vector3(0, 0, 0);
                                playerThreeCamerax.rotationQuaternion = new BABYLON.Quaternion(0, 0, 0, 1);
                                playerThreeCamerax.viewport = new BABYLON.Viewport(0, 0, 0, 0);
                                playerThreeCamerax.setEnabled(false);
                                PROJECT.UniversalCameraSystem.PlayerThreeCamera = playerThreeCamerax;
                                PROJECT.UniversalCameraSystem.PlayerThreeCamera.inertia = this.cameraInertia;
                                PROJECT.UniversalCameraSystem.PlayerThreeCamera.transform = playerThreeTransform;
                                playerThreeTransform.cameraRig = PROJECT.UniversalCameraSystem.PlayerThreeCamera;
                                playerFourTransform = new BABYLON.TransformNode("Player Camera 4", this.scene);
                                playerFourTransform.rotationQuaternion = this.transform.rotationQuaternion.clone();
                                playerFourTransform.position = this.transform.position.clone();
                                playerFourTransform.parent = this.transform.parent;
                                playerFourName = cameraName + ".4";
                                playerFourCamerax = this.m_cameraRig.clone(playerFourName);
                                playerFourCamerax.name = playerFourName;
                                playerFourCamerax.parent = playerFourTransform;
                                playerFourCamerax.position = new BABYLON.Vector3(0, 0, 0);
                                playerFourCamerax.rotationQuaternion = new BABYLON.Quaternion(0, 0, 0, 1);
                                playerFourCamerax.viewport = new BABYLON.Viewport(0, 0, 0, 0);
                                playerFourCamerax.setEnabled(false);
                                PROJECT.UniversalCameraSystem.PlayerFourCamera = playerFourCamerax;
                                PROJECT.UniversalCameraSystem.PlayerFourCamera.inertia = this.cameraInertia;
                                PROJECT.UniversalCameraSystem.PlayerFourCamera.transform = playerFourTransform;
                                playerFourTransform.cameraRig = PROJECT.UniversalCameraSystem.PlayerFourCamera;
                                //}
                                PROJECT.UniversalCameraSystem.multiPlayerView = true;
                                PROJECT.UniversalCameraSystem.SetMultiPlayerViewLayout(this.scene, PROJECT.UniversalCameraSystem.startupMode);
                            }
                            else if (this.cameraType === 3) { // Arc Rotate Camera
                                targetVector = BABYLON.Utilities.ParseVector3(this.arcRotateConfig.target);
                                this.m_cameraRig = new BABYLON.ArcRotateCamera(this.transform.name + ".ArcRotate", this.arcRotateConfig.alpha, this.arcRotateConfig.beta, this.arcRotateConfig.radius, targetVector, this.scene);
                                this.m_cameraRig.wheelPrecision = this.arcRotateConfig.wheel;
                                this.scene.switchActiveCamera(this.m_cameraRig, true);
                            }
                            _b.label = 5;
                        case 5:
                            //if (PROJECT.UniversalCameraSystem.renderingPipeline == null) {
                            if (this.editorPostProcessing != null && this.editorPostProcessing.usePostProcessing === true) {
                                PROJECT.UniversalCameraSystem.renderingPipeline = new BABYLON.DefaultRenderingPipeline("UniversalCameraSystem", this.editorPostProcessing.highDynamicRange, this.scene, this.scene.cameras, true);
                                if (PROJECT.UniversalCameraSystem.renderingPipeline.isSupported === true) {
                                    defaultPipeline = PROJECT.UniversalCameraSystem.renderingPipeline;
                                    defaultPipeline.samples = this.editorPostProcessing.screenAntiAliasing.multiAntiAliasing; // 1 by default (MSAA)
                                    /* Image Processing */
                                    defaultPipeline.imageProcessingEnabled = this.editorPostProcessing.imageProcessingConfig.imageProcessing; //true by default
                                    if (defaultPipeline.imageProcessingEnabled) {
                                        defaultPipeline.imageProcessing.contrast = this.editorPostProcessing.imageProcessingConfig.imageContrast; // 1 by default
                                        defaultPipeline.imageProcessing.exposure = this.editorPostProcessing.imageProcessingConfig.imageExposure; // 1 by default
                                        /* Color Grading */
                                        defaultPipeline.imageProcessing.colorGradingEnabled = this.editorPostProcessing.imageProcessingConfig.useColorGrading; // false by default
                                        if (defaultPipeline.imageProcessing.colorGradingEnabled) {
                                            // KEEP FOR REFERENCE
                                            /* using .3dl (best) : defaultPipeline.imageProcessing.colorGradingTexture = new BABYLON.ColorGradingTexture("textures/LateSunset.3dl", this.scene); */
                                            /* using .png :
                                            var colorGradingTexture = new BABYLON.Texture("textures/colorGrade-highContrast.png", this.scene, true, false);
                                            colorGradingTexture.wrapU = BABYLON.Texture.CLAMP_ADDRESSMODE;
                                            colorGradingTexture.wrapV = BABYLON.Texture.CLAMP_ADDRESSMODE;
                                            defaultPipeline.imageProcessing.colorGradingTexture = colorGradingTexture;
                                            defaultPipeline.imageProcessing.colorGradingWithGreenDepth = false; */
                                            //////////////////////////////////////////////////////////////////////////
                                            if (this.editorPostProcessing.imageProcessingConfig.setGradingTexture != null) {
                                                colorGradingTexture = BABYLON.Utilities.ParseTexture(this.editorPostProcessing.imageProcessingConfig.setGradingTexture, this.scene, true, false);
                                                colorGradingTexture.wrapU = BABYLON.Texture.CLAMP_ADDRESSMODE;
                                                colorGradingTexture.wrapV = BABYLON.Texture.CLAMP_ADDRESSMODE;
                                                defaultPipeline.imageProcessing.colorGradingTexture = colorGradingTexture;
                                                defaultPipeline.imageProcessing.colorGradingWithGreenDepth = false;
                                            }
                                        }
                                        /* Color Curves */
                                        defaultPipeline.imageProcessing.colorCurvesEnabled = this.editorPostProcessing.imageProcessingConfig.imagingColorCurves.curvesEnabled; // false by default
                                        if (defaultPipeline.imageProcessing.colorCurvesEnabled) {
                                            curve = new BABYLON.ColorCurves();
                                            curve.globalDensity = this.editorPostProcessing.imageProcessingConfig.imagingColorCurves.globalDen; // 0 by default
                                            curve.globalExposure = this.editorPostProcessing.imageProcessingConfig.imagingColorCurves.globalExp; // 0 by default
                                            curve.globalHue = this.editorPostProcessing.imageProcessingConfig.imagingColorCurves.globalHue; // 30 by default
                                            curve.globalSaturation = this.editorPostProcessing.imageProcessingConfig.imagingColorCurves.globalSat; // 0 by default
                                            curve.highlightsDensity = this.editorPostProcessing.imageProcessingConfig.imagingColorCurves.highlightsDen; // 0 by default
                                            curve.highlightsExposure = this.editorPostProcessing.imageProcessingConfig.imagingColorCurves.highlightsExp; // 0 by default
                                            curve.highlightsHue = this.editorPostProcessing.imageProcessingConfig.imagingColorCurves.highlightsHue; // 30 by default
                                            curve.highlightsSaturation = this.editorPostProcessing.imageProcessingConfig.imagingColorCurves.highlightsSat; // 0 by default
                                            curve.midtonesDensity = this.editorPostProcessing.imageProcessingConfig.imagingColorCurves.midtonesDen; // 0 by default
                                            curve.midtonesExposure = this.editorPostProcessing.imageProcessingConfig.imagingColorCurves.midtonesExp; // 0 by default
                                            curve.midtonesHue = this.editorPostProcessing.imageProcessingConfig.imagingColorCurves.midtonesHue; // 30 by default
                                            curve.midtonesSaturation = this.editorPostProcessing.imageProcessingConfig.imagingColorCurves.midtonesSat; // 0 by default
                                            curve.shadowsDensity = this.editorPostProcessing.imageProcessingConfig.imagingColorCurves.shadowsDen; // 0 by default
                                            curve.shadowsExposure = this.editorPostProcessing.imageProcessingConfig.imagingColorCurves.shadowsExp; // 800 by default
                                            curve.shadowsHue = this.editorPostProcessing.imageProcessingConfig.imagingColorCurves.shadowsHue; // 30 by default
                                            curve.shadowsSaturation = this.editorPostProcessing.imageProcessingConfig.imagingColorCurves.shadowsSat; // 0 by default;
                                            defaultPipeline.imageProcessing.colorCurves = curve;
                                        }
                                    }
                                    /* Bloom */
                                    defaultPipeline.bloomEnabled = this.editorPostProcessing.bloomEffectProperties.bloomEnabled; // false by default
                                    if (defaultPipeline.bloomEnabled) {
                                        defaultPipeline.bloomKernel = this.editorPostProcessing.bloomEffectProperties.bloomKernel; // 64 by default
                                        defaultPipeline.bloomScale = this.editorPostProcessing.bloomEffectProperties.bloomScale; // 0.5 by default
                                        defaultPipeline.bloomWeight = this.editorPostProcessing.bloomEffectProperties.bloomWeight; // 0.15 by default
                                        defaultPipeline.bloomThreshold = this.editorPostProcessing.bloomEffectProperties.bloomThreshold; // 0.9 by default
                                    }
                                    /* Chromatic Abberation */
                                    defaultPipeline.chromaticAberrationEnabled = this.editorPostProcessing.chromaticAberration.aberrationEnabled; // false by default
                                    if (defaultPipeline.chromaticAberrationEnabled) {
                                        defaultPipeline.chromaticAberration.aberrationAmount = this.editorPostProcessing.chromaticAberration.aberrationAmount; // 30 by default
                                        defaultPipeline.chromaticAberration.adaptScaleToCurrentViewport = this.editorPostProcessing.chromaticAberration.adaptScaleViewport; // false by default
                                        defaultPipeline.chromaticAberration.alphaMode = this.editorPostProcessing.chromaticAberration.alphaMode; // 0 by default
                                        defaultPipeline.chromaticAberration.alwaysForcePOT = this.editorPostProcessing.chromaticAberration.alwaysForcePOT; // false by default
                                        defaultPipeline.chromaticAberration.enablePixelPerfectMode = this.editorPostProcessing.chromaticAberration.pixelPerfectMode; // false by default
                                        defaultPipeline.chromaticAberration.forceFullscreenViewport = this.editorPostProcessing.chromaticAberration.fullscreenViewport; // true by default
                                    }
                                    /* DOF */
                                    defaultPipeline.depthOfFieldEnabled = this.editorPostProcessing.focalDepthOfField.depthOfField; // false by default
                                    if (defaultPipeline.depthOfFieldEnabled && defaultPipeline.depthOfField.isSupported) {
                                        defaultPipeline.depthOfFieldBlurLevel = this.editorPostProcessing.focalDepthOfField.blurLevel; // 0 by default
                                        defaultPipeline.depthOfField.fStop = this.editorPostProcessing.focalDepthOfField.focalStop; // 1.4 by default
                                        defaultPipeline.depthOfField.focalLength = this.editorPostProcessing.focalDepthOfField.focalLength; // 50 by default, mm
                                        defaultPipeline.depthOfField.focusDistance = this.editorPostProcessing.focalDepthOfField.focusDistance; // 2000 by default, mm
                                        defaultPipeline.depthOfField.lensSize = this.editorPostProcessing.focalDepthOfField.maxLensSize; // 50 by default
                                    }
                                    /* FXAA */
                                    defaultPipeline.fxaaEnabled = this.editorPostProcessing.screenAntiAliasing.fullScreenEnabled; // false by default
                                    if (defaultPipeline.fxaaEnabled) {
                                        defaultPipeline.fxaa.samples = this.editorPostProcessing.screenAntiAliasing.screenAntiAliasing; // 1 by default
                                        defaultPipeline.fxaa.adaptScaleToCurrentViewport = this.editorPostProcessing.screenAntiAliasing.adaptScaleViewport; // false by default
                                    }
                                    /* GlowLayer */
                                    defaultPipeline.glowLayerEnabled = this.editorPostProcessing.glowLayerProperties.glowEnabled;
                                    if (defaultPipeline.glowLayerEnabled) {
                                        defaultPipeline.glowLayer.intensity = this.editorPostProcessing.glowLayerProperties.glowIntensity; // 1 by default
                                        defaultPipeline.glowLayer.blurKernelSize = this.editorPostProcessing.glowLayerProperties.blurKernelSize; // 16 by default
                                    }
                                    /* Grain */
                                    defaultPipeline.grainEnabled = this.editorPostProcessing.grainEffectProperties.grainEnabled;
                                    if (defaultPipeline.grainEnabled) {
                                        defaultPipeline.grain.animated = this.editorPostProcessing.grainEffectProperties.grainAnimated; // false by default
                                        defaultPipeline.grain.intensity = this.editorPostProcessing.grainEffectProperties.grainIntensity; // 30 by default
                                        defaultPipeline.grain.adaptScaleToCurrentViewport = this.editorPostProcessing.grainEffectProperties.adaptScaleViewport; // false by default
                                    }
                                    /* Sharpen */
                                    defaultPipeline.sharpenEnabled = this.editorPostProcessing.sharpEffectProperties.sharpenEnabled;
                                    if (defaultPipeline.sharpenEnabled) {
                                        defaultPipeline.sharpen.edgeAmount = this.editorPostProcessing.sharpEffectProperties.sharpEdgeAmount; // 0.3 by default
                                        defaultPipeline.sharpen.colorAmount = this.editorPostProcessing.sharpEffectProperties.sharpColorAmount; // 1 by default
                                        defaultPipeline.sharpen.adaptScaleToCurrentViewport = this.editorPostProcessing.sharpEffectProperties.adaptScaleViewport; // false by default
                                    }
                                }
                                else {
                                    BABYLON.Tools.Warn("Babylon.js default rendering pipeline not supported");
                                }
                            }
                            //}
                            PROJECT.UniversalCameraSystem.cameraReady = true;
                            return [2 /*return*/];
                    }
                });
            });
        };
        UniversalCameraSystem.prototype.updateCameraSystemState = function () {
            if (this.m_cameraRig != null) {
                if (this.cameraType === 0) { // Standard Free Camera
                }
                else if (this.cameraType === 1) { // Virtual Reality Camera
                }
                else if (this.cameraType === 2) { // Multi Player Camera
                }
                else if (this.cameraType === 3) { // Arc Rotate Camera
                }
            }
        };
        UniversalCameraSystem.prototype.destroyCameraSystemState = function () {
            this.virtualReality = null;
        };
        ////////////////////////////////////////////////////////////////////////////////////
        // Universal Camera Virtual Reality Functions
        ////////////////////////////////////////////////////////////////////////////////////
        /** Get the WebXR default experience helper */
        UniversalCameraSystem.GetWebXR = function () { return PROJECT.UniversalCameraSystem.XRExperienceHelper; };
        ////////////////////////////////////////////////////////////////////////////////////
        // Universal Camera System Player Functions
        ////////////////////////////////////////////////////////////////////////////////////
        /** Get universal camera rig for desired player */
        UniversalCameraSystem.GetPlayerCamera = function (scene, player, detach) {
            if (player === void 0) { player = BABYLON.PlayerNumber.One; }
            if (detach === void 0) { detach = false; }
            var result = null;
            if (PROJECT.UniversalCameraSystem.IsCameraSystemReady()) {
                if (player === BABYLON.PlayerNumber.One && PROJECT.UniversalCameraSystem.PlayerOneCamera != null)
                    result = PROJECT.UniversalCameraSystem.PlayerOneCamera;
                else if (player === BABYLON.PlayerNumber.Two && PROJECT.UniversalCameraSystem.PlayerTwoCamera != null)
                    result = PROJECT.UniversalCameraSystem.PlayerTwoCamera;
                else if (player === BABYLON.PlayerNumber.Three && PROJECT.UniversalCameraSystem.PlayerThreeCamera != null)
                    result = PROJECT.UniversalCameraSystem.PlayerThreeCamera;
                else if (player === BABYLON.PlayerNumber.Four && PROJECT.UniversalCameraSystem.PlayerFourCamera != null)
                    result = PROJECT.UniversalCameraSystem.PlayerFourCamera;
            }
            if (detach === true && parent != null)
                result.parent = null;
            return result;
        };
        /** Get camera transform node for desired player */
        UniversalCameraSystem.GetCameraTransform = function (scene, player) {
            if (player === void 0) { player = BABYLON.PlayerNumber.One; }
            var result = null;
            if (PROJECT.UniversalCameraSystem.IsCameraSystemReady()) {
                if (player === BABYLON.PlayerNumber.One && PROJECT.UniversalCameraSystem.PlayerOneCamera != null && PROJECT.UniversalCameraSystem.PlayerOneCamera.transform != null)
                    result = PROJECT.UniversalCameraSystem.PlayerOneCamera.transform;
                else if (player === BABYLON.PlayerNumber.Two && PROJECT.UniversalCameraSystem.PlayerTwoCamera != null && PROJECT.UniversalCameraSystem.PlayerTwoCamera.transform != null)
                    result = PROJECT.UniversalCameraSystem.PlayerTwoCamera.transform;
                else if (player === BABYLON.PlayerNumber.Three && PROJECT.UniversalCameraSystem.PlayerThreeCamera != null && PROJECT.UniversalCameraSystem.PlayerThreeCamera.transform != null)
                    result = PROJECT.UniversalCameraSystem.PlayerThreeCamera.transform;
                else if (player === BABYLON.PlayerNumber.Four && PROJECT.UniversalCameraSystem.PlayerFourCamera != null && PROJECT.UniversalCameraSystem.PlayerFourCamera.transform != null)
                    result = PROJECT.UniversalCameraSystem.PlayerFourCamera.transform;
            }
            return result;
        };
        ////////////////////////////////////////////////////////////////////////////////////
        // Universal Camera System Multi Player Functions
        ////////////////////////////////////////////////////////////////////////////////////
        /** Are stereo side side camera services available. */
        UniversalCameraSystem.IsStereoCameras = function () {
            return PROJECT.UniversalCameraSystem.stereoCameras;
        };
        /** Are local multi player view services available. */
        UniversalCameraSystem.IsMultiPlayerView = function () {
            return PROJECT.UniversalCameraSystem.multiPlayerView;
        };
        /** Get the current local multi player count */
        UniversalCameraSystem.GetMultiPlayerCount = function () {
            return PROJECT.UniversalCameraSystem.multiPlayerCount;
        };
        /** Activates current local multi player cameras. */
        UniversalCameraSystem.ActivateMultiPlayerCameras = function (scene) {
            var result = false;
            if (PROJECT.UniversalCameraSystem.multiPlayerCameras != null && PROJECT.UniversalCameraSystem.multiPlayerCameras.length > 0) {
                scene.activeCameras = PROJECT.UniversalCameraSystem.multiPlayerCameras;
                result = true;
            }
            return result;
        };
        /** Disposes current local multiplayer cameras */
        UniversalCameraSystem.DisposeMultiPlayerCameras = function () {
            if (PROJECT.UniversalCameraSystem.PlayerOneCamera != null) {
                PROJECT.UniversalCameraSystem.PlayerOneCamera.dispose();
                PROJECT.UniversalCameraSystem.PlayerOneCamera = null;
            }
            if (PROJECT.UniversalCameraSystem.PlayerTwoCamera != null) {
                PROJECT.UniversalCameraSystem.PlayerTwoCamera.dispose();
                PROJECT.UniversalCameraSystem.PlayerTwoCamera = null;
            }
            if (PROJECT.UniversalCameraSystem.PlayerThreeCamera != null) {
                PROJECT.UniversalCameraSystem.PlayerThreeCamera.dispose();
                PROJECT.UniversalCameraSystem.PlayerThreeCamera = null;
            }
            if (PROJECT.UniversalCameraSystem.PlayerFourCamera != null) {
                PROJECT.UniversalCameraSystem.PlayerFourCamera.dispose();
                PROJECT.UniversalCameraSystem.PlayerFourCamera = null;
            }
        };
        /** Sets the multi player camera view layout */
        UniversalCameraSystem.SetMultiPlayerViewLayout = function (scene, totalNumPlayers) {
            var result = false;
            var players = BABYLON.Scalar.Clamp(totalNumPlayers, 1, 4);
            if (PROJECT.UniversalCameraSystem.IsMultiPlayerView()) {
                if (PROJECT.UniversalCameraSystem.PlayerOneCamera != null && PROJECT.UniversalCameraSystem.PlayerTwoCamera != null && PROJECT.UniversalCameraSystem.PlayerThreeCamera != null && PROJECT.UniversalCameraSystem.PlayerFourCamera != null) {
                    PROJECT.UniversalCameraSystem.multiPlayerCameras = [];
                    if (players === 1) {
                        PROJECT.UniversalCameraSystem.PlayerOneCamera.viewport = new BABYLON.Viewport(0, 0, 1, 1);
                        PROJECT.UniversalCameraSystem.PlayerTwoCamera.viewport = new BABYLON.Viewport(0, 0, 0, 0);
                        PROJECT.UniversalCameraSystem.PlayerTwoCamera.setEnabled(false);
                        PROJECT.UniversalCameraSystem.PlayerThreeCamera.viewport = new BABYLON.Viewport(0, 0, 0, 0);
                        PROJECT.UniversalCameraSystem.PlayerThreeCamera.setEnabled(false);
                        PROJECT.UniversalCameraSystem.PlayerFourCamera.viewport = new BABYLON.Viewport(0, 0, 0, 0);
                        PROJECT.UniversalCameraSystem.PlayerFourCamera.setEnabled(false);
                        PROJECT.UniversalCameraSystem.multiPlayerCameras.push(PROJECT.UniversalCameraSystem.PlayerOneCamera);
                    }
                    else if (players === 2) {
                        if (PROJECT.UniversalCameraSystem.stereoCameras === true) {
                            PROJECT.UniversalCameraSystem.PlayerOneCamera.viewport = new BABYLON.Viewport(0, 0, 0.5, 1);
                            PROJECT.UniversalCameraSystem.PlayerTwoCamera.viewport = new BABYLON.Viewport(0.5, 0, 0.5, 1);
                        }
                        else {
                            PROJECT.UniversalCameraSystem.PlayerOneCamera.viewport = new BABYLON.Viewport(0, 0.5, 1, 0.5);
                            PROJECT.UniversalCameraSystem.PlayerTwoCamera.viewport = new BABYLON.Viewport(0, 0, 1, 0.5);
                        }
                        PROJECT.UniversalCameraSystem.PlayerTwoCamera.setEnabled(true);
                        PROJECT.UniversalCameraSystem.PlayerThreeCamera.viewport = new BABYLON.Viewport(0, 0, 0, 0);
                        PROJECT.UniversalCameraSystem.PlayerThreeCamera.setEnabled(false);
                        PROJECT.UniversalCameraSystem.PlayerFourCamera.viewport = new BABYLON.Viewport(0, 0, 0, 0);
                        PROJECT.UniversalCameraSystem.PlayerFourCamera.setEnabled(false);
                        PROJECT.UniversalCameraSystem.multiPlayerCameras.push(PROJECT.UniversalCameraSystem.PlayerOneCamera);
                        PROJECT.UniversalCameraSystem.multiPlayerCameras.push(PROJECT.UniversalCameraSystem.PlayerTwoCamera);
                    }
                    else if (players === 3) {
                        PROJECT.UniversalCameraSystem.PlayerOneCamera.viewport = new BABYLON.Viewport(0, 0, 0.5, 1);
                        PROJECT.UniversalCameraSystem.PlayerTwoCamera.viewport = new BABYLON.Viewport(0.5, 0.5, 0.5, 0.5);
                        PROJECT.UniversalCameraSystem.PlayerTwoCamera.setEnabled(true);
                        PROJECT.UniversalCameraSystem.PlayerThreeCamera.viewport = new BABYLON.Viewport(0.5, 0, 0.5, 0.5);
                        PROJECT.UniversalCameraSystem.PlayerThreeCamera.setEnabled(true);
                        PROJECT.UniversalCameraSystem.PlayerFourCamera.viewport = new BABYLON.Viewport(0, 0, 0, 0);
                        PROJECT.UniversalCameraSystem.PlayerFourCamera.setEnabled(false);
                        PROJECT.UniversalCameraSystem.multiPlayerCameras.push(PROJECT.UniversalCameraSystem.PlayerOneCamera);
                        PROJECT.UniversalCameraSystem.multiPlayerCameras.push(PROJECT.UniversalCameraSystem.PlayerTwoCamera);
                        PROJECT.UniversalCameraSystem.multiPlayerCameras.push(PROJECT.UniversalCameraSystem.PlayerThreeCamera);
                    }
                    else if (players === 4) {
                        PROJECT.UniversalCameraSystem.PlayerOneCamera.viewport = new BABYLON.Viewport(0, 0.5, 0.5, 0.5);
                        PROJECT.UniversalCameraSystem.PlayerTwoCamera.viewport = new BABYLON.Viewport(0, 0, 0.5, 0.5);
                        PROJECT.UniversalCameraSystem.PlayerTwoCamera.setEnabled(true);
                        PROJECT.UniversalCameraSystem.PlayerThreeCamera.viewport = new BABYLON.Viewport(0.5, 0.5, 0.5, 0.5);
                        PROJECT.UniversalCameraSystem.PlayerThreeCamera.setEnabled(true);
                        PROJECT.UniversalCameraSystem.PlayerFourCamera.viewport = new BABYLON.Viewport(0.5, 0, 0.5, 0.5);
                        PROJECT.UniversalCameraSystem.PlayerFourCamera.setEnabled(true);
                        PROJECT.UniversalCameraSystem.multiPlayerCameras.push(PROJECT.UniversalCameraSystem.PlayerOneCamera);
                        PROJECT.UniversalCameraSystem.multiPlayerCameras.push(PROJECT.UniversalCameraSystem.PlayerTwoCamera);
                        PROJECT.UniversalCameraSystem.multiPlayerCameras.push(PROJECT.UniversalCameraSystem.PlayerThreeCamera);
                        PROJECT.UniversalCameraSystem.multiPlayerCameras.push(PROJECT.UniversalCameraSystem.PlayerFourCamera);
                    }
                    else {
                        BABYLON.Tools.Warn("Babylon.js camera rig invalid player count specified: " + players);
                    }
                }
                else {
                    BABYLON.Tools.Warn("Babylon.js camera rig failed to initialize multi player cameras");
                }
                PROJECT.UniversalCameraSystem.multiPlayerCount = players;
                result = PROJECT.UniversalCameraSystem.ActivateMultiPlayerCameras(scene);
                if (result === false)
                    BABYLON.Tools.Warn("Babylon.js camera rig failed to initialize multi player views");
            }
            else {
                BABYLON.Tools.Warn("Babylon.js camera rig multi player view option not enabled");
            }
            return result;
        };
        UniversalCameraSystem.PlayerOneCamera = null;
        UniversalCameraSystem.PlayerTwoCamera = null;
        UniversalCameraSystem.PlayerThreeCamera = null;
        UniversalCameraSystem.PlayerFourCamera = null;
        UniversalCameraSystem.XRExperienceHelper = null;
        UniversalCameraSystem.multiPlayerView = false;
        UniversalCameraSystem.multiPlayerCount = 1;
        UniversalCameraSystem.multiPlayerCameras = null;
        UniversalCameraSystem.stereoCameras = true;
        UniversalCameraSystem.startupMode = 1;
        UniversalCameraSystem.cameraReady = false;
        UniversalCameraSystem.renderingPipeline = null;
        return UniversalCameraSystem;
    }(BABYLON.ScriptComponent));
    PROJECT.UniversalCameraSystem = UniversalCameraSystem;
})(PROJECT || (PROJECT = {}));
var PROJECT;
(function (PROJECT) {
    /**
    * Babylon Script Component
    * @class UniversalPlayerController
    */
    var UniversalPlayerController = /** @class */ (function (_super) {
        __extends(UniversalPlayerController, _super);
        function UniversalPlayerController() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.enableInput = false;
            _this.attachCamera = false;
            _this.rotateCamera = true;
            _this.moveCharacter = true;
            _this.toggleView = true;
            _this.freeLooking = false;
            _this.rootMotion = false;
            _this.gravityForce = 0.5;
            _this.slopeForce = 0;
            _this.rayLength = 1;
            _this.rayOrigin = 0;
            _this.maxAngle = 45;
            _this.speedFactor = 1.0;
            _this.moveSpeed = 5.0;
            _this.lookSpeed = 2.0;
            _this.jumpSpeed = 8.0;
            _this.jumpDelay = 0.0;
            _this.eyesHeight = 0.25;
            _this.pivotHeight = 0.25;
            _this.topLookLimit = 60.0;
            _this.downLookLimit = 30.0;
            _this.lowTurnSpeed = 15.0;
            _this.highTurnSpeed = 25.0;
            _this.takeoffPower = 2.5;
            _this.stoppingPower = 5.0;
            _this.acceleration = false;
            _this.avatarSkinTag = "Skin";
            _this.distanceFactor = 0.85;
            _this.cameraSmoothing = 5;
            _this.cameraCollisions = true;
            _this.inputMagnitude = 0;
            _this.minimumDistance = 0.85;
            _this.buttonJump = BABYLON.Xbox360Button.A;
            _this.keyboardJump = BABYLON.UserInputKey.SpaceBar;
            _this.buttonCamera = BABYLON.Xbox360Button.Y;
            _this.keyboardCamera = BABYLON.UserInputKey.P;
            _this.playerNumber = BABYLON.PlayerNumber.One;
            _this.boomPosition = new BABYLON.Vector3(0, 0, 0);
            _this.movementVelocity = BABYLON.Vector3.Zero();
            _this.abstractMesh = null;
            _this.cameraDistance = 0;
            _this.forwardCamera = false;
            _this.dollyDirection = BABYLON.Vector3.Zero();
            _this.rotationEulers = BABYLON.Vector3.Zero();
            _this.cameraPivotOffset = BABYLON.Vector3.Zero();
            _this.cameraForwardVector = new BABYLON.Vector3(0, 0, 0);
            _this.cameraRightVector = new BABYLON.Vector3(0, 0, 0);
            _this.desiredForwardVector = new BABYLON.Vector3(0, 0, 0);
            _this.desiredRightVector = new BABYLON.Vector3(0, 0, 0);
            _this.scaledCamDirection = BABYLON.Vector3.Zero();
            _this.scaledMaxDirection = BABYLON.Vector3.Zero();
            _this.parentNodePosition = BABYLON.Vector3.Zero();
            _this.maximumCameraPos = BABYLON.Vector3.Zero();
            _this.raycastShape = null;
            _this.raycastGroup = BABYLON.CollisionFilters.DefaultFilter;
            _this.raycastMask = (BABYLON.CollisionFilters.AllFilter ^ BABYLON.CollisionFilters.CharacterFilter);
            _this.avatarSkins = null;
            _this.cameraNode = null;
            _this.cameraPivot = null;
            _this.navigationAgent = null;
            _this.characterController = null;
            _this.isCharacterNavigating = false;
            _this.isCharacterGrounded = false;
            _this.isCharacterJumpFrame = false;
            _this.isCharacterJumpState = false;
            _this.navigationAngularSpeed = 0;
            _this.animationControllerTag = "Animator";
            _this.animationStateMachine = false;
            _this.animationStateParams = null;
            _this.showDebugColliders = false;
            _this.colliderVisibility = 0;
            _this.deltaTime = 0;
            _this.jumpTimer = 0;
            _this.playerControl = 0;
            _this.playerInputX = 0;
            _this.playerInputZ = 0;
            _this.playerMouseX = 0;
            _this.playerMouseY = 0;
            _this.groundedMesh = null;
            _this.groundedPoint = null;
            _this.groundedAngle = 0;
            _this.groundedNormal = null;
            _this.verticalVelocity = 0;
            _this.rootmotionSpeed = 0;
            _this.smoothDeltaTime = 0;
            _this.animationState = null;
            _this.inputMovementVector = BABYLON.Vector3.Zero();
            _this.playerLookRotation = BABYLON.Vector3.Zero();
            _this.playerRotationVector = BABYLON.Vector2.Zero();
            _this.playerMovementVelocity = BABYLON.Vector3.Zero();
            _this.playerRotationQuaternion = BABYLON.Quaternion.Zero();
            /** Register handler that is triggered before the controller has been updated */
            _this.onPreUpdateObservable = new BABYLON.Observable();
            /** Register handler that is triggered before the controller movement has been applied */
            _this.onBeforeMoveObservable = new BABYLON.Observable();
            /** Register handler that is triggered after the controller has been updated */
            _this.onPostUpdateObservable = new BABYLON.Observable();
            _this.pickingRay = null;
            _this.pickingHelper = null;
            _this.pickingOrigin = null;
            _this.pickingDirection = new BABYLON.Vector3(0, -1, 0);
            _this.cameraRay = null;
            _this.cameraHelper = null;
            _this.cameraForward = new BABYLON.Vector3(0, 0, 0);
            _this.cameraDirection = new BABYLON.Vector3(0, 0, 0);
            return _this;
        }
        UniversalPlayerController.prototype.getPlayerInputX = function () { return this.playerInputX; };
        UniversalPlayerController.prototype.getPlayerInputZ = function () { return this.playerInputZ; };
        UniversalPlayerController.prototype.getPlayerMouseX = function () { return this.playerMouseX; };
        UniversalPlayerController.prototype.getPlayerMouseY = function () { return this.playerMouseY; };
        UniversalPlayerController.prototype.getPlayerJumping = function () { return this.isCharacterJumpState; };
        UniversalPlayerController.prototype.getPlayerGrounded = function () { return this.isCharacterGrounded; };
        UniversalPlayerController.prototype.getGroundedMesh = function () { return this.groundedMesh; };
        UniversalPlayerController.prototype.getGroundedPoint = function () { return this.groundedPoint; };
        UniversalPlayerController.prototype.getGroundedAngle = function () { return this.groundedAngle; };
        UniversalPlayerController.prototype.getGroundedNormal = function () { return this.groundedNormal; };
        UniversalPlayerController.prototype.getCameraBoomNode = function () { return this.cameraNode; };
        UniversalPlayerController.prototype.getCameraTransform = function () { return this.cameraPivot; };
        UniversalPlayerController.prototype.getAnimationState = function () { return this.animationState; };
        UniversalPlayerController.prototype.getCharacterController = function () { return this.characterController; };
        UniversalPlayerController.prototype.awake = function () { this.awakePlayerController(); };
        UniversalPlayerController.prototype.start = function () { this.startPlayerController(); };
        UniversalPlayerController.prototype.update = function () { this.updatePlayerController(); };
        UniversalPlayerController.prototype.late = function () { this.latePlayerController(); };
        UniversalPlayerController.prototype.after = function () { this.afterPlayerController(); };
        UniversalPlayerController.prototype.destroy = function () { this.destroyPlayerController(); };
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Controller Attachment Functions
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /** TODO */
        UniversalPlayerController.prototype.setPlayerControl = function (mode) {
            this.playerControl = mode;
            if (this.playerControl === PROJECT.PlayerInputControl.ThirdPersonStrafing || this.playerControl === PROJECT.PlayerInputControl.ThirdPersonForward) {
                this.showAvatarSkins(true);
            }
            else {
                this.showAvatarSkins(false);
            }
            if (this.playerControl === PROJECT.PlayerInputControl.ThirdPersonForward) {
                this.forwardCamera = true;
            }
            else if (this.playerControl === PROJECT.PlayerInputControl.ThirdPersonStrafing) {
                this.forwardCamera = false;
            }
        };
        /** TODO */
        UniversalPlayerController.prototype.togglePlayerControl = function () {
            if (this.toggleView === true) {
                if (this.playerControl === PROJECT.PlayerInputControl.FirstPersonStrafing) {
                    if (this.forwardCamera === true) {
                        this.setPlayerControl(PROJECT.PlayerInputControl.ThirdPersonForward);
                    }
                    else {
                        this.setPlayerControl(PROJECT.PlayerInputControl.ThirdPersonStrafing);
                    }
                }
                else {
                    this.setPlayerControl(PROJECT.PlayerInputControl.FirstPersonStrafing);
                }
            }
        };
        UniversalPlayerController.prototype.showAvatarSkins = function (show) {
            if (this.avatarSkins != null) {
                // TODO - Make Skins Visible Or Not TO Camera But Keep Shadows - ???
                this.avatarSkins.forEach(function (skin) { skin.isVisible = show; });
            }
        };
        /** TODO */
        UniversalPlayerController.prototype.attachPlayerCamera = function (player) {
            if (this.cameraNode == null) {
                var playerCamera = (player <= 0 || player > 4) ? 1 : player;
                this.cameraNode = PROJECT.UniversalCameraSystem.GetCameraTransform(this.scene, playerCamera);
                if (this.cameraNode != null) {
                    this.cameraNode.parent = this.cameraPivot;
                    this.cameraNode.position.copyFrom(this.boomPosition);
                    this.cameraNode.rotationQuaternion = new BABYLON.Quaternion(0, 0, 0, 1);
                    // ..
                    // TODO - Move somewhere better - ???
                    // TODO - Handle Long Intitial Camera Pan - ???
                    // ..
                    this.cameraDistance = this.cameraNode.position.length();
                    this.dollyDirection.copyFrom(this.cameraNode.position);
                    this.dollyDirection.normalize();
                }
                else {
                    BABYLON.Tools.Warn("Failed to locate player camera for: " + this.transform.name);
                }
            }
        };
        UniversalPlayerController.prototype.attachAnimationController = function () {
            if (this.animationState == null) {
                if (this.animationControllerTag != null && this.animationControllerTag !== "") {
                    var botmesh = null;
                    if (this.hasTransformTags(this.animationControllerTag)) {
                        botmesh = this.transform;
                    }
                    else {
                        botmesh = this.getChildWithTags(this.animationControllerTag, false);
                    }
                    if (botmesh != null) {
                        this.animationState = BABYLON.SceneManager.FindScriptComponent(botmesh, "BABYLON.AnimationState");
                    }
                    else {
                        BABYLON.Tools.Warn("Failed to locate bot mesh with tag: " + this.animationControllerTag);
                    }
                }
            }
        };
        /** TODO */
        UniversalPlayerController.prototype.resetPlayerRotation = function () {
            this.transform.rotationQuaternion.toEulerAnglesToRef(this.rotationEulers);
            this.playerRotationVector.x = this.rotationEulers.x;
            this.playerRotationVector.y = this.rotationEulers.y;
        };
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Controller Worker Functions
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        UniversalPlayerController.prototype.awakePlayerController = function () {
            var _this = this;
            this.gravityForce = this.getProperty("gravityForce", this.gravityForce);
            this.rotateCamera = this.getProperty("rotateCamera", this.rotateCamera);
            this.moveCharacter = this.getProperty("moveCharacter", this.moveCharacter);
            this.slopeForce = this.getProperty("slopeForce", this.slopeForce);
            this.rayLength = this.getProperty("rayLength", this.rayLength);
            this.rayOrigin = this.getProperty("rayOrigin", this.rayOrigin);
            this.maxAngle = this.getProperty("maxAngle", this.maxAngle);
            this.speedFactor = this.getProperty("speedFactor", this.speedFactor);
            this.moveSpeed = this.getProperty("moveSpeed", this.moveSpeed);
            this.lookSpeed = this.getProperty("lookSpeed", this.lookSpeed);
            this.jumpSpeed = this.getProperty("jumpSpeed", this.jumpSpeed);
            this.jumpDelay = this.getProperty("jumpDelay", this.jumpDelay);
            this.eyesHeight = this.getProperty("eyesHeight", this.eyesHeight);
            this.pivotHeight = this.getProperty("pivotHeight", this.pivotHeight);
            this.topLookLimit = this.getProperty("topLookLimit", this.topLookLimit);
            this.downLookLimit = this.getProperty("downLookLimit", this.downLookLimit);
            this.lowTurnSpeed = this.getProperty("lowTurnSpeed", this.lowTurnSpeed);
            this.highTurnSpeed = this.getProperty("highTurnSpeed", this.highTurnSpeed);
            this.enableInput = this.getProperty("enableInput", this.enableInput);
            this.rootMotion = this.getProperty("rootMotion", this.rootMotion);
            this.playerNumber = this.getProperty("playerNumber", this.playerNumber);
            this.attachCamera = this.getProperty("attachCamera", this.attachCamera);
            this.freeLooking = this.getProperty("freeLooking", this.freeLooking);
            this.toggleView = this.getProperty("toggleView", this.toggleView);
            this.avatarSkinTag = this.getProperty("avatarSkinTag", this.avatarSkinTag);
            this.cameraCollisions = this.getProperty("cameraCollisions", this.cameraCollisions);
            this.cameraSmoothing = this.getProperty("cameraSmoothing", this.cameraSmoothing);
            this.distanceFactor = this.getProperty("distanceFactor", this.distanceFactor);
            this.minimumDistance = this.getProperty("minimumDistance", this.minimumDistance);
            this.stoppingPower = this.getProperty("stoppingPower", this.stoppingPower);
            this.takeoffPower = this.getProperty("takeoffPower", this.takeoffPower);
            this.acceleration = this.getProperty("acceleration", this.acceleration);
            this.animationControllerTag = this.getProperty("animationControllerTag", this.animationControllerTag);
            this.animationStateMachine = this.getProperty("animationStateMachine", this.animationStateMachine);
            this.animationStateParams = this.getProperty("animationStateParams", this.animationStateParams);
            // ..
            var boomPositionData = this.getProperty("boomPosition");
            if (boomPositionData != null)
                this.boomPosition = BABYLON.Utilities.ParseVector3(boomPositionData);
            // ..
            var sphereRadius = this.getProperty("sphereRadius", 0.5);
            this.raycastShape = BABYLON.SceneManager.CreatePhysicsSphereShape(sphereRadius);
            // ..
            this.abstractMesh = this.getAbstractMesh();
            this.showDebugColliders = BABYLON.Utilities.ShowDebugColliders();
            this.colliderVisibility = BABYLON.Utilities.ColliderVisibility();
            // Note: Get Avatar Skins First Thing
            if (this.avatarSkinTag != null && this.avatarSkinTag !== "") {
                this.avatarSkins = this.getChildrenWithTags(this.avatarSkinTag, false);
            }
            var pcontrol = this.getProperty("playerControl", this.playerControl);
            this.setPlayerControl(pcontrol);
            this.resetPlayerRotation();
            // ..
            this.cameraPivot = new BABYLON.Mesh(this.transform.name + ".CameraPivot", this.scene);
            this.cameraPivot.parent = null;
            this.cameraPivot.position = this.transform.position.clone();
            this.cameraPivot.rotationQuaternion = this.transform.rotationQuaternion.clone();
            this.cameraPivot.checkCollisions = false;
            this.cameraPivot.isPickable = false;
            // ..
            if (this.showDebugColliders === true) {
                var testPivot = BABYLON.MeshBuilder.CreateBox("TestPivot", { width: 0.25, height: 0.25, depth: 0.5 }, this.scene);
                testPivot.parent = this.cameraPivot;
                testPivot.position.set(0, 0, 0);
                testPivot.rotationQuaternion = new BABYLON.Quaternion(0, 0, 0, 1);
                testPivot.visibility = 0.5;
                testPivot.checkCollisions = false;
                testPivot.isPickable = false;
            }
            // ..
            BABYLON.SceneManager.OnKeyboardPress(this.keyboardCamera, function () { _this.togglePlayerControl(); });
            BABYLON.SceneManager.OnGamepadButtonPress(this.buttonCamera, function () { _this.togglePlayerControl(); });
            //
            this.navigationAgent = this.getComponent("BABYLON.NavigationAgent");
            this.characterController = this.getComponent("BABYLON.CharacterController");
            if (this.characterController != null) {
                BABYLON.Tools.Warn("Starting player controller in physic engine mode for: " + this.transform.name);
            }
            else {
                BABYLON.Tools.Warn("Starting player controller in check collisions mode for: " + this.transform.name);
            }
            if (this.characterController == null && this.abstractMesh != null) {
                this.abstractMesh.checkCollisions = true;
                this.abstractMesh.isPickable = true;
                // ..
                // Create a debug collision shape
                // ..
                if (this.showDebugColliders === true && this.transform._debugCollider == null) {
                    var ellipsoidSegs = 16;
                    var capsuleSize = this.abstractMesh.ellipsoid.clone();
                    var debugName = this.transform.name + ".Debug";
                    var debugCapsule = BABYLON.MeshBuilder.CreateSphere(debugName, { segments: ellipsoidSegs, diameterX: (capsuleSize.x * 2), diameterY: (capsuleSize.y * 2), diameterZ: (capsuleSize.z * 2) }, this.scene);
                    debugCapsule.position.set(0, 0, 0);
                    debugCapsule.rotationQuaternion = this.transform.rotationQuaternion.clone();
                    debugCapsule.setParent(this.transform);
                    debugCapsule.position.set(0, 0, 0);
                    debugCapsule.visibility = this.colliderVisibility;
                    debugCapsule.material = BABYLON.Utilities.GetColliderMaterial(this.scene);
                    debugCapsule.checkCollisions = false;
                    debugCapsule.isPickable = false;
                    this.transform._debugCollider = debugCapsule;
                }
            }
        };
        UniversalPlayerController.prototype.startPlayerController = function () {
            // TODO - Support Dynamic PlayerNumber Change - ???
            if (this.attachCamera === true) {
                this.attachPlayerCamera(this.playerNumber);
            }
        };
        UniversalPlayerController.prototype.updatePlayerController = function () {
            // TODO - FIX THIS SHIT
            if (this.animationStateMachine === true) {
                this.attachAnimationController();
            }
            // ..
            this.deltaTime = this.getDeltaSeconds();
            this.smoothDeltaTime = BABYLON.System.SmoothDeltaFactor * this.deltaTime + (1 - BABYLON.System.SmoothDeltaFactor) * this.smoothDeltaTime;
            if (this.jumpTimer > 0) {
                this.jumpTimer -= this.deltaTime;
                if (this.jumpTimer < 0)
                    this.jumpTimer = 0;
            }
            // ..
            if (this.enableInput === false)
                return;
            this.playerInputX = BABYLON.SceneManager.GetUserInput(BABYLON.UserInputAxis.Horizontal, this.playerNumber);
            this.playerInputZ = BABYLON.SceneManager.GetUserInput(BABYLON.UserInputAxis.Vertical, this.playerNumber);
            this.playerMouseX = BABYLON.SceneManager.GetUserInput(BABYLON.UserInputAxis.MouseX, this.playerNumber);
            this.playerMouseY = BABYLON.SceneManager.GetUserInput(BABYLON.UserInputAxis.MouseY, this.playerNumber);
            //..
            // Update Input Magnitude
            // ..
            this.inputMovementVector.set(this.playerInputX, 0, this.playerInputZ);
            BABYLON.Utilities.ClampMagnitudeVector3ToRef(this.inputMovementVector, 1.0, this.inputMovementVector);
            this.inputMagnitude = this.inputMovementVector.length();
            // ..
            // Update Pre Notifications
            // ..
            if (this.onPreUpdateObservable.hasObservers() === true) {
                this.onPreUpdateObservable.notifyObservers(this.transform);
            }
            // ..
            // Update Forward Camera Vector
            // ..
            this.cameraForwardVector.copyFrom(this.cameraPivot.forward);
            this.cameraForwardVector.y = 0;
            this.cameraForwardVector.normalize();
            this.cameraForwardVector.scaleToRef(this.playerInputZ, this.desiredForwardVector);
            // ..
            // Update Right Camera Vector
            // ..
            this.cameraRightVector.copyFrom(this.cameraPivot.right);
            this.cameraRightVector.y = 0;
            this.cameraRightVector.normalize();
            this.cameraRightVector.scaleToRef(this.playerInputX, this.desiredRightVector);
            // ..
            // Update Player Rotation Vector
            // ..
            this.playerRotationVector.y += (this.playerMouseX * this.lookSpeed * this.deltaTime);
            this.playerRotationVector.x += (-this.playerMouseY * this.lookSpeed * this.deltaTime);
            this.playerRotationVector.x = BABYLON.Scalar.Clamp(this.playerRotationVector.x, -BABYLON.Tools.ToRadians(this.downLookLimit), BABYLON.Tools.ToRadians(this.topLookLimit));
            // ..
            // Update Player Movement Velocity
            // ..
            var movementSpeed = (this.inputMagnitude * this.moveSpeed * this.deltaTime * this.speedFactor);
            var locomotionSpeed = (this.rootmotionSpeed * this.speedFactor);
            if (this.playerControl === PROJECT.PlayerInputControl.FirstPersonStrafing) {
                // Strafing First Person View - Player Movement Velocity
                this.desiredForwardVector.addToRef(this.desiredRightVector, this.playerMovementVelocity);
                if (this.rootMotion === true) {
                    this.playerMovementVelocity.scaleInPlace(locomotionSpeed);
                }
                else {
                    this.playerMovementVelocity.scaleInPlace(movementSpeed);
                }
                // No Free Looking - Snap Player Rotation (Euler Angle Rotation)
                BABYLON.Quaternion.FromEulerAnglesToRef(0, this.playerRotationVector.y, 0, this.transform.rotationQuaternion);
            }
            else if (this.playerControl === PROJECT.PlayerInputControl.ThirdPersonStrafing) {
                // Strafing Third Person View - Player Movement Velocity
                this.desiredForwardVector.addToRef(this.desiredRightVector, this.playerMovementVelocity);
                if (this.rootMotion === true) {
                    this.playerMovementVelocity.scaleInPlace(locomotionSpeed);
                }
                else {
                    this.playerMovementVelocity.scaleInPlace(movementSpeed);
                }
                // Validate Free Looking Rotation
                if (this.freeLooking === true) {
                    if (this.inputMagnitude > 0) {
                        // FIXME - Note: Large Movement - Slerp Player Rotation (Euler Angle Rotation)
                        var strafingTurnRatio = (this.playerMovementVelocity.length() / this.moveSpeed);
                        var strafingTurnSpeed = BABYLON.Scalar.Lerp(this.highTurnSpeed, this.lowTurnSpeed, strafingTurnRatio);
                        BABYLON.Quaternion.FromEulerAnglesToRef(0, this.playerRotationVector.y, 0, this.playerRotationQuaternion);
                        BABYLON.Quaternion.SlerpToRef(this.transform.rotationQuaternion, this.playerRotationQuaternion, (strafingTurnSpeed * this.deltaTime), this.transform.rotationQuaternion);
                    }
                }
                else {
                    // No Free Looking - Snap Player Rotation (Euler Angle Rotation)
                    BABYLON.Quaternion.FromEulerAnglesToRef(0, this.playerRotationVector.y, 0, this.transform.rotationQuaternion);
                }
            }
            else if (this.playerControl === PROJECT.PlayerInputControl.ThirdPersonForward) {
                // Forward Third Person View - Player Look Rotation
                this.desiredForwardVector.addToRef(this.desiredRightVector, this.playerLookRotation);
                if (this.rootMotion === true) {
                    this.transform.forward.scaleToRef(locomotionSpeed, this.playerMovementVelocity);
                }
                else {
                    this.transform.forward.scaleToRef(movementSpeed, this.playerMovementVelocity);
                }
                // Always Free Looking - Lerp Player Rotation (Turn And Burn)
                if (this.inputMagnitude > 0) {
                    var forwardTurnRatio = (this.playerMovementVelocity.length() / this.moveSpeed);
                    var forwardTurnSpeed = BABYLON.Scalar.Lerp(this.highTurnSpeed, this.lowTurnSpeed, forwardTurnRatio);
                    BABYLON.Utilities.LookRotationToRef(this.playerLookRotation, this.playerRotationQuaternion);
                    BABYLON.Quaternion.SlerpToRef(this.transform.rotationQuaternion, this.playerRotationQuaternion, (forwardTurnSpeed * this.deltaTime), this.transform.rotationQuaternion);
                }
            }
            // ..
            // Update Player Acceleration
            // ..
            if (this.acceleration === true) {
                if (this.takeoffPower < 0.1)
                    this.takeoffPower = 0.1;
                if (this.stoppingPower < 0.1)
                    this.stoppingPower = 0.1;
                BABYLON.Vector3.LerpToRef(this.movementVelocity, this.playerMovementVelocity, (this.takeoffPower * this.smoothDeltaTime), this.movementVelocity);
                var playerMovementLength = this.playerMovementVelocity.length();
                var finalMovementLength = this.movementVelocity.length();
                if (playerMovementLength === 0 && finalMovementLength > 0 && finalMovementLength < (this.stoppingPower * 0.01)) {
                    this.movementVelocity.copyFrom(this.playerMovementVelocity);
                }
            }
            else {
                this.movementVelocity.copyFrom(this.playerMovementVelocity);
            }
            // ..
            // Update Character Controller
            // ..
            this.isCharacterGrounded = true;
            this.isCharacterJumpFrame = false;
            this.isCharacterNavigating = (this.navigationAgent != null && this.navigationAgent.isNavigating());
            this.navigationAngularSpeed = (this.navigationAgent != null) ? this.navigationAgent.angularSpeed : 0;
            if (this.characterController != null) {
                this.updateCharacterController();
            }
            else {
                this.updateCheckCollisions();
            }
            // ..
            // Update Animation State Params
            // ..
            if (this.animationState != null) {
                if (this.animationStateMachine === true) {
                    this.validateAnimationStateParams();
                    this.animationState.setFloat(this.animationStateParams.horizontalInput, this.playerInputX);
                    this.animationState.setFloat(this.animationStateParams.verticalInput, this.playerInputZ);
                    this.animationState.setFloat(this.animationStateParams.mouseXInput, this.playerMouseX);
                    this.animationState.setFloat(this.animationStateParams.mouseYInput, this.playerMouseY);
                    this.animationState.setFloat(this.animationStateParams.speedInput, this.inputMagnitude);
                    this.animationState.setBool(this.animationStateParams.jumpedInput, this.isCharacterJumpFrame);
                    this.animationState.setBool(this.animationStateParams.jumpingInput, this.isCharacterJumpState);
                    this.animationState.setBool(this.animationStateParams.groundedInput, this.isCharacterGrounded);
                    if (this.isCharacterNavigating === true) {
                        // TODO - Update Speed Input With Navigation Magnitude
                        // this.animationState.setFloat(this.animationStateParams.speedInput, this.inputMagnitude);
                    }
                }
            }
            // ..
            // Update Post Notifications
            // ..
            if (this.onPostUpdateObservable.hasObservers() === true) {
                this.onPostUpdateObservable.notifyObservers(this.transform);
            }
        };
        UniversalPlayerController.prototype.updateCharacterController = function () {
            if (this.moveCharacter === true && this.characterController != null) {
                this.isCharacterGrounded = this.characterController.isGrounded();
                this.groundedMesh = null;
                this.groundedPoint = null;
                this.groundedNormal = null;
                this.groundedAngle = (this.groundedNormal != null) ? Math.abs(BABYLON.Utilities.GetAngle(this.groundedNormal, this.transform.forward) - 90) : 0;
                // ..
                // DEBUG: let msg:string = "Character Controller Gounded: " + this.isCharacterGrounded;
                // DEBUG: if (this.groundedNormal != null) msg += (" --> Hit Angle: " + this.groundedAngle.toString());
                // DEBUG: if (this.groundedMesh != null) msg += (" --> Ground Mesh: " + this.groundedMesh.name);
                // DEBUG: BABYLON.Utilities.PrintToScreen(msg);
                // ..
                if (this.isCharacterNavigating === false) {
                    if (this.isCharacterGrounded === true) {
                        if (this.isCharacterJumpState === true) {
                            if (this.jumpDelay > 0)
                                this.jumpTimer = (this.jumpDelay + this.deltaTime);
                            this.isCharacterJumpState = false;
                        }
                        if (this.jumpTimer <= 0)
                            this.isCharacterJumpFrame = (BABYLON.SceneManager.GetKeyboardInput(this.keyboardJump) || BABYLON.SceneManager.GetGamepadButtonInput(this.buttonJump));
                        if (this.isCharacterJumpFrame === true) {
                            this.isCharacterJumpState = true;
                            this.characterController.jump(this.jumpSpeed);
                        }
                        // ..
                        // Update Move Notifications
                        // ..
                        if (this.onBeforeMoveObservable.hasObservers() === true) {
                            this.onBeforeMoveObservable.notifyObservers(this.transform);
                        }
                        this.characterController.move(this.movementVelocity);
                    }
                }
                else {
                    this.characterController.setGhostWorldPosition(this.transform.position);
                }
            }
        };
        UniversalPlayerController.prototype.updateCheckCollisions = function () {
            if (this.moveCharacter === true && this.abstractMesh != null) {
                var pick = this.pickCheckCollisionsRaycast();
                this.isCharacterGrounded = (pick != null && pick.hit);
                this.groundedMesh = (pick != null && pick.hit) ? pick.pickedMesh : null;
                this.groundedPoint = (pick != null && pick.hit) ? pick.pickedPoint : null;
                this.groundedNormal = (pick != null && pick.hit) ? pick.getNormal(true) : null;
                this.groundedAngle = (this.groundedNormal != null) ? Math.abs(BABYLON.Utilities.GetAngle(this.groundedNormal, this.transform.forward) - 90) : 0;
                // ..
                // DEBUG: let msg:string = "Check Collisions Gounded: " + this.isCharacterGrounded;
                // DEBUG: if (this.groundedNormal != null) msg += (" --> Hit Angle: " + this.groundedAngle.toString());
                // DEBUG: if (this.groundedMesh != null) msg += (" --> Ground Mesh: " + this.groundedMesh.name);
                // DEBUG: BABYLON.Utilities.PrintToScreen(msg);
                // ..
                if (this.gravityForce > 0)
                    this.verticalVelocity -= (this.deltaTime * this.gravityForce); // Note: Apply Constant Gravity
                if (this.isCharacterNavigating === false) {
                    if (this.isCharacterGrounded === true) {
                        var slopeFactor = (this.maxAngle > 0 && this.groundedAngle > 0 && this.groundedAngle < this.maxAngle) ? 0 : this.slopeForce;
                        this.verticalVelocity = Math.max(-slopeFactor, this.verticalVelocity); // Note: Allowed Slope Angle Support
                        if (this.isCharacterJumpState === true) {
                            if (this.jumpDelay > 0)
                                this.jumpTimer = (this.jumpDelay + this.deltaTime);
                            this.isCharacterJumpState = false;
                        }
                        if (this.jumpTimer <= 0)
                            this.isCharacterJumpFrame = (BABYLON.SceneManager.GetKeyboardInput(this.keyboardJump) || BABYLON.SceneManager.GetGamepadButtonInput(this.buttonJump));
                        if (this.isCharacterJumpFrame === true) {
                            this.isCharacterJumpState = true;
                            this.verticalVelocity = (this.jumpSpeed * 0.015); // Note: Jump Speed Scale Factor
                        }
                    }
                    this.movementVelocity.y = this.verticalVelocity;
                    // ..
                    // Update Move Notifications
                    // ..
                    if (this.onBeforeMoveObservable.hasObservers() === true) {
                        this.onBeforeMoveObservable.notifyObservers(this.transform);
                    }
                    this.abstractMesh.moveWithCollisions(this.movementVelocity);
                }
            }
        };
        UniversalPlayerController.prototype.pickCheckCollisionsRaycast = function (fastCheck) {
            var _this = this;
            if (fastCheck === void 0) { fastCheck = true; }
            if (this.abstractMesh == null)
                return null;
            if (this.rayLength <= 0)
                this.rayLength = 0.1;
            var raycastLength = (this.rayLength / this.transform.scaling.y) + 0.05;
            if (this.pickingRay == null) {
                if (this.pickingOrigin == null)
                    this.pickingOrigin = new BABYLON.Vector3(0, this.rayOrigin, 0);
                this.pickingRay = new BABYLON.Ray(this.pickingOrigin, this.pickingDirection, raycastLength);
            }
            if (this.pickingHelper == null) {
                this.pickingHelper = new BABYLON.RayHelper(this.pickingRay);
                if (this.pickingOrigin == null)
                    this.pickingOrigin = new BABYLON.Vector3(0, this.rayOrigin, 0);
                this.pickingHelper.attachToMesh(this.abstractMesh, this.pickingDirection, this.pickingOrigin, raycastLength);
                if (this.showDebugColliders === true)
                    this.pickingHelper.show(this.scene, new BABYLON.Color3(1, 0, 0));
            }
            return (this.pickingRay != null) ? this.scene.pickWithRay(this.pickingRay, function (mesh) { return (mesh != _this.abstractMesh && mesh.checkCollisions === true); }, fastCheck) : null;
        };
        UniversalPlayerController.prototype.pickCameraCollisionsRaycast = function (origin, direction, rayLength, fastCheck) {
            var _this = this;
            if (fastCheck === void 0) { fastCheck = true; }
            if (this.abstractMesh == null)
                return null;
            if (this.cameraRay == null)
                this.cameraRay = new BABYLON.Ray(origin, direction, rayLength);
            if (this.cameraRay != null) {
                this.cameraRay.origin.copyFrom(origin);
                this.cameraRay.direction.copyFrom(direction);
                this.cameraRay.length = rayLength;
            }
            if (this.cameraHelper == null) {
                this.cameraHelper = new BABYLON.RayHelper(this.cameraRay);
                if (this.showDebugColliders === true)
                    this.cameraHelper.show(this.scene, new BABYLON.Color3(1, 0, 0));
            }
            return (this.cameraRay != null) ? this.scene.pickWithRay(this.cameraRay, function (mesh) { return (mesh != _this.abstractMesh && mesh.checkCollisions === true); }, fastCheck) : null;
        };
        UniversalPlayerController.prototype.latePlayerController = function () {
            if (this.enableInput === false)
                return;
            var allowRotation = this.rotateCamera;
            // DUNNO FUR SURE:  if (this.isCharacterNavigating === true && this.navigationAngularSpeed > 0) allowRotation = false;
            if (this.cameraPivot != null) {
                // .. 
                // Update Camera Pivot Offset
                // ..
                if (this.playerControl === PROJECT.PlayerInputControl.ThirdPersonStrafing || this.playerControl === PROJECT.PlayerInputControl.ThirdPersonForward) {
                    this.cameraPivotOffset.set(0, this.pivotHeight, 0);
                }
                else {
                    this.cameraPivotOffset.set(0, this.eyesHeight, 0);
                }
                // ..
                // Update Camera Pivot Position
                // ..
                BABYLON.Utilities.GetAbsolutePositionToRef(this.transform, this.cameraPivot.position, this.cameraPivotOffset);
                // ..
                // Update Camera Pivot Rotation
                // ..
                if (allowRotation === true) {
                    BABYLON.Quaternion.FromEulerAnglesToRef(this.playerRotationVector.x, this.playerRotationVector.y, 0, this.cameraPivot.rotationQuaternion);
                }
            }
            if (allowRotation === true && this.cameraNode != null) {
                if (this.cameraSmoothing <= 0)
                    this.cameraSmoothing = 5.0; // Default Camera Smoothing
                if (this.playerControl === PROJECT.PlayerInputControl.ThirdPersonStrafing || this.playerControl === PROJECT.PlayerInputControl.ThirdPersonForward) {
                    if (this.cameraCollisions === true) {
                        // ..
                        // Check Camera Collision
                        // ..
                        var maxDistance = Math.abs(this.boomPosition.z);
                        var parentNode = this.cameraNode.parent;
                        this.dollyDirection.scaleToRef(maxDistance, this.scaledMaxDirection);
                        this.dollyDirection.scaleToRef(this.cameraDistance, this.scaledCamDirection);
                        BABYLON.Utilities.GetAbsolutePositionToRef(parentNode, this.parentNodePosition);
                        BABYLON.Utilities.TransformPointToRef(parentNode, this.scaledMaxDirection, this.maximumCameraPos);
                        // ..
                        var contact = false;
                        var distance = 0;
                        if (this.characterController != null) {
                            // Note: Use Bullet Physics Shape Cast
                            var raycast = BABYLON.SceneManager.PhysicsShapecastToPoint(this.scene, this.raycastShape, this.parentNodePosition, this.maximumCameraPos, this.raycastGroup, this.raycastMask);
                            contact = (raycast != null && raycast.hasHit === true && raycast.collisionObject != null && raycast.collisionObject.entity != null);
                            distance = (raycast != null && raycast.hasHit === true) ? raycast.hitDistance : 0;
                        }
                        else {
                            // Note: Use Native Scene Pick With Ray
                            this.cameraForward.set(0, 0, -1);
                            BABYLON.Utilities.TransformPointToRef(parentNode, this.cameraForward, this.cameraForward);
                            this.cameraForward.subtractToRef(this.parentNodePosition, this.cameraDirection);
                            this.cameraDirection.normalize();
                            // ..
                            var pick = this.pickCameraCollisionsRaycast(this.parentNodePosition, this.cameraDirection, this.maximumCameraPos.length());
                            contact = (pick != null && pick.hit);
                            distance = (pick != null && pick.distance);
                        }
                        if (contact === true) {
                            this.cameraDistance = BABYLON.Scalar.Clamp((distance * this.distanceFactor), this.minimumDistance, maxDistance);
                            // Lerp Past Camera Collisions
                            if (this.cameraNode.position.x !== this.scaledCamDirection.x || this.cameraNode.position.y !== this.scaledCamDirection.y || this.cameraNode.position.z !== this.scaledCamDirection.z) {
                                BABYLON.Vector3.LerpToRef(this.cameraNode.position, this.scaledCamDirection, (this.deltaTime * this.cameraSmoothing), this.cameraNode.position);
                            }
                        }
                        else {
                            // Lerp To Camera Boom Position
                            if (this.cameraNode.position.x !== this.boomPosition.x || this.cameraNode.position.y !== this.boomPosition.y || this.cameraNode.position.z !== this.boomPosition.z) {
                                BABYLON.Vector3.LerpToRef(this.cameraNode.position, this.boomPosition, (this.deltaTime * this.cameraSmoothing), this.cameraNode.position);
                            }
                        }
                    }
                    else {
                        // Lerp To Camera Boom Position
                        if (this.cameraNode.position.x !== this.boomPosition.x || this.cameraNode.position.y !== this.boomPosition.y || this.cameraNode.position.z !== this.boomPosition.z) {
                            BABYLON.Vector3.LerpToRef(this.cameraNode.position, this.boomPosition, (this.deltaTime * this.cameraSmoothing), this.cameraNode.position);
                        }
                    }
                }
                else {
                    // Note: Snap To Zero Camera Pivot Position - First Person View
                    if (this.cameraNode.position.x !== 0 || this.cameraNode.position.y !== 0 || this.cameraNode.position.z !== 0) {
                        this.cameraNode.position.set(0, 0, 0);
                    }
                }
            }
        };
        UniversalPlayerController.prototype.afterPlayerController = function () {
            if (this.enableInput === false)
                return;
            this.rootmotionSpeed = 0;
            if (this.animationState != null && this.animationStateMachine === true) {
                this.rootmotionSpeed = this.animationState.getRootMotionSpeed();
            }
        };
        UniversalPlayerController.prototype.destroyPlayerController = function () {
            this.cameraPivot = null;
            this.cameraNode = null;
            this.animationState = null;
            this.characterController = null;
            this.onPreUpdateObservable.clear();
            this.onPreUpdateObservable = null;
            this.onBeforeMoveObservable.clear();
            this.onBeforeMoveObservable = null;
            this.onPostUpdateObservable.clear();
            this.onPostUpdateObservable = null;
        };
        UniversalPlayerController.prototype.validateAnimationStateParams = function () {
            if (this.animationStateParams == null) {
                this.animationStateParams = {
                    horizontalInput: "Horizontal",
                    verticalInput: "Vertical",
                    mouseXInput: "MouseX",
                    mouseYInput: "MouseY",
                    speedInput: "Speed",
                    jumpedInput: "Jumped",
                    jumpingInput: "Jumping",
                    groundedInput: "Grounded"
                };
            }
        };
        return UniversalPlayerController;
    }(BABYLON.ScriptComponent));
    PROJECT.UniversalPlayerController = UniversalPlayerController;
    /**
    * Babylon Enum Definition
    * @interface PlayerInputControl
    */
    var PlayerInputControl;
    (function (PlayerInputControl) {
        PlayerInputControl[PlayerInputControl["FirstPersonStrafing"] = 0] = "FirstPersonStrafing";
        PlayerInputControl[PlayerInputControl["ThirdPersonStrafing"] = 1] = "ThirdPersonStrafing";
        PlayerInputControl[PlayerInputControl["ThirdPersonForward"] = 2] = "ThirdPersonForward";
    })(PlayerInputControl = PROJECT.PlayerInputControl || (PROJECT.PlayerInputControl = {}));
})(PROJECT || (PROJECT = {}));
var PROJECT;
(function (PROJECT) {
    /**
    * Babylon Script Component
    * @class FxParticleSystem
    */
    var FxParticleSystem = /** @class */ (function (_super) {
        __extends(FxParticleSystem, _super);
        function FxParticleSystem() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.m_particleEmitter = null;
            _this.m_particleSystem = null;
            return _this;
        }
        FxParticleSystem.prototype.getParticleEmitter = function () { return this.m_particleEmitter; };
        FxParticleSystem.prototype.getParticleSystem = function () { return this.m_particleSystem; };
        FxParticleSystem.prototype.awake = function () {
            var rootUrl = BABYLON.SceneManager.GetRootUrl(this.scene);
            var classType = this.getProperty("classType", 0);
            var particleText = this.getProperty("base64ParticleSystem");
            var playOnAwake = this.getProperty("playOnAwake", false);
            var particleTexture = this.getProperty("particleTexture");
            this.m_particleEmitter = this.getAbstractMesh();
            if (this.m_particleEmitter == null) {
                this.m_particleEmitter = BABYLON.Mesh.CreateBox(this.transform.name + ".Emitter", 0.25, this.scene);
                this.m_particleEmitter.parent = this.transform;
                this.m_particleEmitter.position.set(0, 0, 0);
                this.m_particleEmitter.isVisible = false;
                this.m_particleEmitter.isPickable = false;
                this.m_particleEmitter.material = BABYLON.Utilities.GetColliderMaterial(this.scene);
            }
            if (particleText != null && particleText !== "") {
                var particleJson = window.atob(particleText);
                if (particleJson != null && particleJson !== "") {
                    var particleParsed = JSON.parse(particleJson);
                    if (particleParsed != null) {
                        if (particleParsed.texture != null && particleTexture != null) {
                            particleParsed.texture.name = particleTexture.filename; // Note: Particle System Parser Use Name Not Url
                            particleParsed.texture.url = particleTexture.filename; // Note: Particle System Parser Use Name Not Url
                        }
                        if (classType === 1) { // GPU Particle System
                            this.m_particleSystem = BABYLON.GPUParticleSystem.Parse(particleParsed, this.scene, rootUrl);
                        }
                        else { // CPU Particle System
                            this.m_particleSystem = BABYLON.ParticleSystem.Parse(particleParsed, this.scene, rootUrl);
                        }
                        if (this.m_particleSystem != null) {
                            if (this.m_particleEmitter != null)
                                this.m_particleSystem.emitter = this.m_particleEmitter;
                            if (playOnAwake === false)
                                this.m_particleSystem.stop();
                        }
                    }
                }
            }
        };
        FxParticleSystem.prototype.destroy = function () {
            this.m_particleEmitter = null;
            if (this.m_particleSystem != null) {
                this.m_particleSystem.dispose();
                this.m_particleSystem = null;
            }
        };
        return FxParticleSystem;
    }(BABYLON.ScriptComponent));
    PROJECT.FxParticleSystem = FxParticleSystem;
})(PROJECT || (PROJECT = {}));
var PROJECT;
(function (PROJECT) {
    /**
     * Babylon water material system pro class (Babylon Water Material)
     * @class SkyMaterialSystem - All rights reserved (c) 2020 Mackey Kinard
     */
    var SkyMaterialSystem = /** @class */ (function (_super) {
        __extends(SkyMaterialSystem, _super);
        function SkyMaterialSystem() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.skyfog = false;
            _this.skysize = 1000;
            _this.probesize = 128;
            _this.reflections = false;
            _this.reflectlevel = 1;
            _this.skytintcolor = new BABYLON.Color3(1, 1, 1);
            _this.m_skyboxMesh = null;
            _this.m_skyMaterial = null;
            _this.m_reflectProbe = null;
            return _this;
        }
        SkyMaterialSystem.prototype.getSkyboxMesh = function () { return this.m_skyboxMesh; };
        SkyMaterialSystem.prototype.getSkyMaterial = function () { return this.m_skyMaterial; };
        SkyMaterialSystem.prototype.getReflectionProbe = function () { return this.m_reflectProbe; };
        SkyMaterialSystem.prototype.awake = function () { this.awakeSkyboxMaterial(); };
        SkyMaterialSystem.prototype.start = function () { };
        SkyMaterialSystem.prototype.update = function () { };
        SkyMaterialSystem.prototype.late = function () { };
        SkyMaterialSystem.prototype.after = function () { };
        SkyMaterialSystem.prototype.destroy = function () { this.destroySkyboxMaterial(); };
        SkyMaterialSystem.prototype.awakeSkyboxMaterial = function () {
            this.skyfog = this.getProperty("skyfog", this.skyfog);
            this.skysize = this.getProperty("skysize", this.skysize);
            this.probesize = this.getProperty("probesize", this.probesize);
            this.reflections = this.getProperty("reflections", this.reflections);
            this.reflectlevel = this.getProperty("reflectlevel", this.reflectlevel);
            // ..
            var tintColor = this.getProperty("tintColor");
            if (tintColor != null)
                this.skytintcolor = BABYLON.Utilities.ParseColor3(tintColor);
            // ..
            this.m_skyboxMesh = BABYLON.Mesh.CreateBox("Ambient Skybox", this.skysize, this.scene);
            this.m_skyboxMesh.position.set(0, 0, 0);
            this.m_skyboxMesh.infiniteDistance = true;
            this.m_skyboxMesh.applyFog = this.skyfog;
            if (this.scene.useRightHandedSystem === true)
                this.m_skyboxMesh.scaling.x *= -1;
            // Setup Sky Material Properties
            this.m_skyMaterial = new BABYLON.SkyMaterial(this.transform.name + ".SkyMaterial", this.scene);
            this.m_skyMaterial.backFaceCulling = false;
            this.setSkyboxTintColor(this.skytintcolor);
            /**
             * Defines the overall luminance of sky in interval [0, 1].
             */
            this.m_skyMaterial.luminance = this.getProperty("luminance", this.m_skyMaterial.luminance);
            /**
            * Defines the amount (scattering) of haze as opposed to molecules in atmosphere.
            */
            this.m_skyMaterial.turbidity = this.getProperty("turbidity", this.m_skyMaterial.turbidity);
            /**
             * Defines the sky appearance (light intensity).
             */
            this.m_skyMaterial.rayleigh = this.getProperty("rayleigh", this.m_skyMaterial.rayleigh);
            /**
             * Defines the mieCoefficient in interval [0, 0.1] which affects the property .mieDirectionalG.
             */
            this.m_skyMaterial.mieCoefficient = this.getProperty("miecoefficient", this.m_skyMaterial.mieCoefficient);
            /**
             * Defines the amount of haze particles following the Mie scattering theory.
             */
            this.m_skyMaterial.mieDirectionalG = this.getProperty("miedirectionalg", this.m_skyMaterial.mieDirectionalG);
            /**
             * Defines the distance of the sun according to the active scene camera.
             */
            this.m_skyMaterial.distance = this.getProperty("distance", this.m_skyMaterial.distance);
            /**
             * Defines the sun inclination, in interval [-0.5, 0.5]. When the inclination is not 0, the sun is said
             * "inclined".
             */
            this.m_skyMaterial.inclination = this.getProperty("inclination", this.m_skyMaterial.inclination);
            /**
             * Defines the solar azimuth in interval [0, 1]. The azimuth is the angle in the horizontal plan between
             * an object direction and a reference direction.
             */
            this.m_skyMaterial.azimuth = this.getProperty("azimuth", this.m_skyMaterial.azimuth);
            /**
             * Defines an offset vector used to get a horizon offset.
             * @example skyMaterial.cameraOffset.y = camera.globalPosition.y // Set horizon relative to 0 on the Y axis
             */
            var camOffsetData = this.getProperty("cameraoffset");
            if (camOffsetData != null)
                this.m_skyMaterial.cameraOffset = BABYLON.Utilities.ParseVector3(camOffsetData);
            /**
             * Defines if the sun position should be computed (inclination and azimuth) according to the scene
             * sun position.
             */
            this.m_skyMaterial.useSunPosition = this.getProperty("usesunposition", this.m_skyMaterial.useSunPosition);
            this.m_skyMaterial.sunPosition = new BABYLON.Vector3(0, 50, 0);
            if (this.scene.metadata != null && this.scene.metadata.unity != null && this.scene.metadata.unity) {
                if (this.scene.metadata.unity.sunposition != null) {
                    this.m_skyMaterial.sunPosition = BABYLON.Utilities.ParseVector3(this.scene.metadata.unity.sunposition);
                }
            }
            // Assign Sky Material To Skybox Mesh
            this.m_skyboxMesh.material = this.m_skyMaterial;
            // Setup Environment Reflection Probe Texture
            if (this.reflections === true) {
                this.m_reflectProbe = new BABYLON.ReflectionProbe("Skybox-ReflectionProbe", this.probesize, this.scene);
                this.m_reflectProbe.renderList.push(this.m_skyboxMesh);
                this.scene.customRenderTargets.push(this.m_reflectProbe.cubeTexture);
                this.scene.environmentTexture = this.m_reflectProbe.cubeTexture;
                this.scene.environmentIntensity = this.reflectlevel;
            }
        };
        SkyMaterialSystem.prototype.destroySkyboxMaterial = function () {
            if (this.m_skyboxMesh != null) {
                this.m_skyboxMesh.dispose();
                this.m_skyboxMesh = null;
            }
            if (this.m_reflectProbe != null) {
                this.m_reflectProbe.dispose();
                this.m_reflectProbe = null;
            }
            if (this.m_skyMaterial != null) {
                this.m_skyMaterial.dispose();
                this.m_skyMaterial = null;
            }
        };
        /** Set Skybox Mesh tint color. (Box Mesh Vertex Colors) */
        SkyMaterialSystem.prototype.setSkyboxTintColor = function (color) {
            var colors = [];
            var numVertices = this.m_skyboxMesh.getTotalVertices();
            for (var i = 0; i < numVertices; ++i) {
                colors.push(color.r, color.g, color.b, 1.0);
            }
            this.m_skyboxMesh.setVerticesData("color", colors);
            this.m_skyboxMesh.useVertexColors = true;
        };
        return SkyMaterialSystem;
    }(BABYLON.ScriptComponent));
    PROJECT.SkyMaterialSystem = SkyMaterialSystem;
})(PROJECT || (PROJECT = {}));
var PROJECT;
(function (PROJECT) {
    /**
     * Babylon water material system pro class (Babylon Water Material)
     * @class WaterMaterialSystem - All rights reserved (c) 2020 Mackey Kinard
     */
    var WaterMaterialSystem = /** @class */ (function (_super) {
        __extends(WaterMaterialSystem, _super);
        function WaterMaterialSystem() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.waterTag = "Water";
            _this.targetSize = new BABYLON.Vector2(128, 128);
            _this.renderSize = new BABYLON.Vector2(512, 512);
            _this.depthFactor = 1.0;
            _this.reflectSkybox = true;
            _this.subDivisions = 32;
            _this.heightOffset = 1.0;
            _this.windDirection = new BABYLON.Vector2(0, 1);
            _this.windForce = 6;
            _this.waveSpeed = 1.0;
            _this.waveLength = 0.4;
            _this.waveHeight = 0.4;
            _this.bumpHeight = 0.4;
            _this.waterColor = new BABYLON.Color3(0.1, 0.1, 0.6);
            _this.colorBlendFactor = 0.2;
            _this.waterColor2 = new BABYLON.Color3(0.1, 0.1, 0.6);
            _this.colorBlendFactor2 = 0.2;
            _this.disableClipPlane = false;
            _this.m_waterGeometry = null;
            _this.m_waterMaterial = null;
            return _this;
        }
        WaterMaterialSystem.prototype.getWaterGeometry = function () { return this.m_waterGeometry; };
        WaterMaterialSystem.prototype.getWaterMaterial = function () { return this.m_waterMaterial; };
        WaterMaterialSystem.prototype.awake = function () {
            var _this = this;
            this.waterTag = this.getProperty("watertag", this.waterTag);
            this.depthFactor = this.getProperty("depthfactor", this.depthFactor);
            this.subDivisions = this.getProperty("subdivisions", this.subDivisions);
            this.heightOffset = this.getProperty("heightoffset", this.heightOffset);
            this.reflectSkybox = this.getProperty("reflectskybox", this.reflectSkybox);
            this.windForce = this.getProperty("windforce", this.windForce);
            this.waveSpeed = this.getProperty("wavespeed", this.waveSpeed);
            this.waveLength = this.getProperty("wavelength", this.waveLength);
            this.waveHeight = this.getProperty("waveheight", this.waveHeight);
            this.bumpHeight = this.getProperty("bumpheight", this.bumpHeight);
            this.bumpSuperimpose = this.getProperty("bumpsuperimpose", this.bumpSuperimpose);
            this.bumpAffectsReflection = this.getProperty("bumpaffectsreflection", this.bumpAffectsReflection);
            this.colorBlendFactor = this.getProperty("colorblendfactor", this.colorBlendFactor);
            this.colorBlendFactor2 = this.getProperty("colorblendfactor2", this.colorBlendFactor2);
            this.disableClipPlane = this.getProperty("disableclipplane", this.disableClipPlane);
            this.fresnelSeparate = this.getProperty("fresnelseparate", this.fresnelSeparate);
            // ..
            var wcolor1 = this.getProperty("watercolor");
            this.waterColor = BABYLON.Utilities.ParseColor3(wcolor1);
            // ..
            var wcolor2 = this.getProperty("watercolor2");
            this.waterColor2 = BABYLON.Utilities.ParseColor3(wcolor2);
            // ..
            var wdirection = this.getProperty("winddirection");
            this.windDirection = BABYLON.Utilities.ParseVector2(wdirection);
            // ..
            var itargetsize = this.getProperty("targetsize");
            if (itargetsize != null)
                this.targetSize = BABYLON.Utilities.ParseVector2(itargetsize);
            // ..        
            var irendersize = this.getProperty("rendersize");
            if (irendersize != null)
                this.renderSize = BABYLON.Utilities.ParseVector2(irendersize);
            /* Awake component function */
            var bumpTexture = null;
            var bumpTextureData = this.getProperty("bumptexture");
            if (bumpTextureData != null)
                bumpTexture = BABYLON.Utilities.ParseTexture(bumpTextureData, this.scene);
            if (bumpTexture != null) {
                this.m_waterMaterial = new BABYLON.WaterMaterial(this.transform.name + ".Water", this.scene, this.renderSize);
                this.m_waterMaterial.bumpTexture = bumpTexture;
                this.m_waterMaterial.windDirection = this.windDirection;
                this.m_waterMaterial.windForce = this.windForce;
                this.m_waterMaterial.waveSpeed = this.waveSpeed;
                this.m_waterMaterial.waveLength = this.waveLength;
                this.m_waterMaterial.waveHeight = this.waveHeight;
                this.m_waterMaterial.bumpHeight = this.bumpHeight;
                this.m_waterMaterial.bumpSuperimpose = this.bumpSuperimpose;
                this.m_waterMaterial.bumpAffectsReflection = this.bumpAffectsReflection;
                this.m_waterMaterial.waterColor = this.waterColor;
                this.m_waterMaterial.colorBlendFactor = this.colorBlendFactor;
                this.m_waterMaterial.waterColor2 = this.waterColor2;
                this.m_waterMaterial.colorBlendFactor2 = this.colorBlendFactor2;
                this.m_waterMaterial.disableClipPlane = this.disableClipPlane;
                this.m_waterMaterial.fresnelSeparate = this.fresnelSeparate;
                // ..
                // Water Material Tags
                // ..
                if (this.reflectSkybox === true) {
                    var skyboxMesh = BABYLON.SceneManager.GetAmbientSkybox(this.scene);
                    if (skyboxMesh != null)
                        this.m_waterMaterial.addToRenderList(skyboxMesh);
                }
                if (this.waterTag != null && this.waterTag !== "") {
                    var waterMeshes = this.scene.getMeshesByTags(this.waterTag);
                    if (waterMeshes != null && waterMeshes.length > 0) {
                        waterMeshes.forEach(function (mesh) {
                            _this.m_waterMaterial.addToRenderList(mesh);
                        });
                    }
                }
                // ..
                // Water Material Mesh
                // ..
                this.m_waterGeometry = BABYLON.Mesh.CreateGround(this.transform.name + ".WaterMesh", this.targetSize.x, this.targetSize.y, this.subDivisions, this.scene, false);
                this.m_waterGeometry.parent = this.transform;
                this.m_waterGeometry.position.set(0, this.heightOffset, 0);
                if (this.depthFactor > 0)
                    this.m_waterGeometry.scaling.y *= this.depthFactor;
                this.m_waterGeometry.material = this.m_waterMaterial;
            }
            else {
                BABYLON.Tools.Warn("No supported water bump texture for: " + this.transform.name);
            }
        };
        WaterMaterialSystem.prototype.start = function () { };
        WaterMaterialSystem.prototype.update = function () { };
        WaterMaterialSystem.prototype.late = function () { };
        WaterMaterialSystem.prototype.after = function () { };
        WaterMaterialSystem.prototype.destroy = function () { };
        return WaterMaterialSystem;
    }(BABYLON.ScriptComponent));
    PROJECT.WaterMaterialSystem = WaterMaterialSystem;
})(PROJECT || (PROJECT = {}));
var PROJECT;
(function (PROJECT) {
    /**
    * Babylon Script Component
    * @class SimpleFollowCamera
    */
    var SimpleFollowCamera = /** @class */ (function (_super) {
        __extends(SimpleFollowCamera, _super);
        function SimpleFollowCamera(transform, scene, properties) {
            if (properties === void 0) { properties = {}; }
            var _this = _super.call(this, transform, scene, properties) || this;
            _this.smoothFollow = 0;
            _this.smoothRotate = 0;
            _this.matchRotation = false;
            _this.followTarget = null;
            _this.targetPosition = BABYLON.Vector3.Zero();
            _this.targetRotation = BABYLON.Quaternion.Zero();
            _this.smoothFollow = _this.getProperty("smoothFollow", _this.smoothFollow);
            _this.smoothRotate = _this.getProperty("smoothRotate", _this.smoothRotate);
            _this.matchRotation = _this.getProperty("matchRotation", _this.matchRotation);
            var ftarget = _this.getProperty("followTarget");
            if (ftarget != null) {
                _this.followTarget = BABYLON.Utilities.ParseTransformByID(ftarget, _this.scene);
                if (_this.followTarget != null) {
                    BABYLON.Utilities.ValidateTransformQuaternion(_this.followTarget);
                }
            }
            BABYLON.Utilities.ValidateTransformQuaternion(_this.transform);
            return _this;
        }
        SimpleFollowCamera.prototype.start = function () {
            //console.log("Starting simple follow target for: " + this.transform.name);
        };
        SimpleFollowCamera.prototype.late = function () {
            if (this.followTarget != null) {
                var deltaTime = this.getDeltaSeconds();
                BABYLON.Utilities.GetAbsolutePositionToRef(this.followTarget, this.targetPosition);
                this.targetRotation.copyFrom(this.followTarget.absoluteRotationQuaternion);
                // ..
                if (this.smoothFollow > 0) {
                    BABYLON.Vector3.LerpToRef(this.transform.position, this.targetPosition, (deltaTime * this.smoothFollow), this.transform.position);
                }
                else {
                    this.transform.position.copyFrom(this.targetPosition);
                }
                // ..
                if (this.matchRotation === true) {
                    if (this.smoothRotate > 0) {
                        BABYLON.Quaternion.SlerpToRef(this.transform.rotationQuaternion, this.targetRotation, (deltaTime * this.smoothRotate), this.transform.rotationQuaternion);
                    }
                    else {
                        this.transform.rotationQuaternion.copyFrom(this.targetRotation);
                    }
                }
            }
        };
        return SimpleFollowCamera;
    }(BABYLON.ScriptComponent));
    PROJECT.SimpleFollowCamera = SimpleFollowCamera;
})(PROJECT || (PROJECT = {}));
var PROJECT;
(function (PROJECT) {
    /**
    * Babylon Script Component
    * @class SmoothFollowTarget
    */
    var SmoothFollowTarget = /** @class */ (function (_super) {
        __extends(SmoothFollowTarget, _super);
        function SmoothFollowTarget(transform, scene, properties) {
            if (properties === void 0) { properties = {}; }
            var _this = _super.call(this, transform, scene, properties) || this;
            _this.target = null;
            _this.targetHeight = 1.75;
            _this.followHeight = 1.75;
            _this.heightDamping = 12.0;
            _this.rotationDamping = 3.0;
            _this.minimumDistance = 6.0;
            _this.maximumDistance = 8.0;
            _this.startBehindTarget = true;
            _this.followBehindTarget = true;
            _this.targetPosition = BABYLON.Vector3.Zero();
            _this.targetAngles = new BABYLON.Vector3(0, 0, 0);
            _this.transformAngles = new BABYLON.Vector3(0, 0, 0);
            _this.positionBuffer = new BABYLON.Vector3(0, 0, 0);
            _this.rotationBuffer = new BABYLON.Quaternion(0, 0, 0, 1);
            _this.tempRotationBuffer = new BABYLON.Vector3(0, 0, 0);
            _this.targetHeight = _this.getProperty("targetHeight", _this.targetHeight);
            _this.followHeight = _this.getProperty("followHeight", _this.followHeight);
            _this.heightDamping = _this.getProperty("heightDamping", _this.heightDamping);
            _this.rotationDamping = _this.getProperty("rotationDamping", _this.rotationDamping);
            _this.minimumDistance = _this.getProperty("minimumDistance", _this.minimumDistance);
            _this.maximumDistance = _this.getProperty("maximumDistance", _this.maximumDistance);
            _this.startBehindTarget = _this.getProperty("startBehindTarget", _this.startBehindTarget);
            _this.followBehindTarget = _this.getProperty("followBehindTarget", _this.followBehindTarget);
            if (_this.rotationDamping <= 0)
                _this.rotationDamping = 3;
            if (_this.heightDamping <= 0)
                _this.heightDamping = 12;
            var followTarget = _this.getProperty("target");
            if (followTarget != null) {
                _this.target = BABYLON.Utilities.ParseTransformByID(followTarget, _this.scene);
            }
            return _this;
        }
        SmoothFollowTarget.prototype.start = function () {
            if (this.target != null) {
                if (this.startBehindTarget === true) {
                    // TODO - this.transform.position = this.target.position.clone(); - ???
                }
            }
        };
        SmoothFollowTarget.prototype.late = function () {
            if (this.target != null) {
                this.targetPosition.copyFrom(this.target.position);
                if (this.followBehindTarget === true) {
                    var deltaTime = this.getDeltaSeconds();
                    BABYLON.Utilities.ToEulerToRef(this.target.rotationQuaternion, this.targetAngles);
                    BABYLON.Utilities.ToEulerToRef(this.transform.rotationQuaternion, this.transformAngles);
                    var normalizedSpeed = 1.0; // TODO - Get Target Normalized Speed
                    var wantedHeight = (this.targetPosition.y + this.followHeight);
                    var currentHeight = BABYLON.Scalar.Lerp(this.transform.position.y, wantedHeight, (this.heightDamping * deltaTime));
                    var wantedRotationAngle = this.targetAngles.y;
                    var currentRotationAngle = BABYLON.Scalar.LerpAngle(this.transformAngles.y, wantedRotationAngle, (this.rotationDamping * deltaTime));
                    var wantedTargetDistance = BABYLON.Scalar.Lerp(this.minimumDistance, this.maximumDistance, normalizedSpeed);
                    BABYLON.Utilities.FromEulerToRef(0, currentRotationAngle, 0, this.rotationBuffer);
                    BABYLON.Utilities.MultiplyQuaternionByVectorToRef(this.rotationBuffer, BABYLON.Vector3.Forward(), this.tempRotationBuffer);
                    this.tempRotationBuffer.scaleInPlace(wantedTargetDistance);
                    //let wantedRotationAngle = this.targetAngles.y;
                    //let wantedHeight = this.targetPosition.y + this.height;
                    //let currentRotationAngle = this.transformAngles.y;
                    //let currentHeight = this.transform.position.y;
                    //currentRotationAngle = BABYLON.Scalar.LerpAngle(currentRotationAngle, wantedRotationAngle, this.rotationDamping * deltaTime);
                    //currentHeight = BABYLON.Scalar.Lerp(currentHeight, wantedHeight, this.heightDamping * deltaTime);
                    //BABYLON.Utilities.FromEulerToRef(0, currentRotationAngle, 0, this.rotationBuffer);
                    //BABYLON.Utilities.MultiplyQuaternionByVectorToRef(this.rotationBuffer, BABYLON.Vector3.Forward(), this.tempRotationBuffer);
                    //this.tempRotationBuffer.scaleInPlace(this.distance);
                    this.positionBuffer.copyFrom(this.targetPosition);
                    this.positionBuffer.subtractInPlace(this.tempRotationBuffer);
                    this.transform.position.set(this.positionBuffer.x, currentHeight, this.positionBuffer.z);
                }
                this.targetPosition.y += this.targetHeight;
                this.transform.lookAt(this.targetPosition);
            }
        };
        SmoothFollowTarget.prototype.destroy = function () {
            this.target = null;
            this.targetAngles = null;
            this.transformAngles = null;
            this.positionBuffer = null;
            this.rotationBuffer = null;
            this.tempRotationBuffer = null;
        };
        return SmoothFollowTarget;
    }(BABYLON.ScriptComponent));
    PROJECT.SmoothFollowTarget = SmoothFollowTarget;
})(PROJECT || (PROJECT = {}));
var PROJECT;
(function (PROJECT) {
    /**
    * Babylon Script Component
    * @class WaypointTargetManager
    */
    var WaypointTargetManager = /** @class */ (function (_super) {
        __extends(WaypointTargetManager, _super);
        function WaypointTargetManager(transform, scene, properties) {
            if (properties === void 0) { properties = {}; }
            var _this = _super.call(this, transform, scene, properties) || this;
            _this._waypointMeshLines = null;
            _this._waypointSplineCurve = null;
            _this._waypointTransformNodes = null;
            _this._waypointSplinePositions = null;
            _this._waypointSphereMaterial = null;
            _this.resolution = 1;
            _this.closedLoop = true;
            _this.drawLines = false;
            _this.drawPoints = false;
            _this.drawTraces = false;
            _this.pointSize = 0.5;
            _this.lineHeight = 0.25;
            _this.lineColor = new BABYLON.Color3(1, 1, 1);
            _this.pointColor = new BABYLON.Color3(1, 1, 1);
            _this.traceColor = new BABYLON.Color3(1, 1, 1);
            _this.resolution = _this.getProperty("resolution", _this.resolution);
            _this.closedLoop = _this.getProperty("closedLoop", _this.closedLoop);
            _this.drawLines = _this.getProperty("drawLines", _this.drawLines);
            _this.drawPoints = _this.getProperty("drawPoints", _this.drawPoints);
            _this.drawTraces = _this.getProperty("drawTraces", _this.drawTraces);
            _this.pointSize = _this.getProperty("pointSize", _this.pointSize);
            _this.lineHeight = _this.getProperty("lineHeight", _this.lineHeight);
            // ..
            var lcolor = _this.getProperty("lineColor");
            var pcolor = _this.getProperty("pointColor");
            var tcolor = _this.getProperty("traceColor");
            // ..
            _this.lineColor = BABYLON.Utilities.ParseColor3(lcolor, _this.lineColor);
            _this.pointColor = BABYLON.Utilities.ParseColor3(pcolor, _this.pointColor);
            _this.traceColor = BABYLON.Utilities.ParseColor3(tcolor, _this.traceColor);
            // ..
            _this._waypointSphereMaterial = new BABYLON.StandardMaterial(_this.transform.name + ".SplineMaterial", _this.scene);
            _this._waypointSphereMaterial.diffuseColor = _this.pointColor;
            //this._waypointSphereMaterial.wireframe = true;
            // ..
            _this._waypointTransformNodes = _this.transform.getChildren(null, true);
            if (_this._waypointTransformNodes != null && _this._waypointTransformNodes.length > 0) {
                var controlPoints_1 = [];
                _this._waypointTransformNodes.forEach(function (transform) {
                    BABYLON.Utilities.ValidateTransformQuaternion(transform);
                    // TODO - FIXME - Use Transform Point To Get World Position
                    // controlPoints.push(transform.getAbsolutePosition().clone());
                    controlPoints_1.push(BABYLON.Utilities.GetAbsolutePosition(transform));
                    if (_this.drawPoints === true) {
                        var controlPoint = BABYLON.MeshBuilder.CreateSphere(transform.name + ".WireSphere", { segments: 24, diameter: (_this.pointSize * 2) }, _this.scene);
                        controlPoint.parent = transform;
                        controlPoint.position.set(0, 0, 0);
                        controlPoint.visibility = 0.25;
                        controlPoint.isVisible = true;
                        controlPoint.material = _this._waypointSphereMaterial;
                    }
                });
                _this._waypointSplineCurve = BABYLON.Curve3.CreateCatmullRomSpline(controlPoints_1, _this.resolution, _this.closedLoop);
                if (_this._waypointSplineCurve != null)
                    _this._waypointSplinePositions = _this._waypointSplineCurve.getPoints();
                if (_this._waypointSplinePositions != null)
                    console.warn("DEBUG: Waypoint Manager - " + _this.transform.name + ": (" + _this._waypointTransformNodes.length + " - " + _this._waypointSplinePositions.length + " - " + _this._waypointSplineCurve.length().toFixed(2) + ")");
            }
            return _this;
        }
        WaypointTargetManager.prototype.getSplineCurve = function () { return this._waypointSplineCurve; };
        WaypointTargetManager.prototype.getSplineCurveLength = function () { return (this._waypointSplineCurve != null) ? this._waypointSplineCurve.length() : 0; };
        WaypointTargetManager.prototype.getSplineCurvePositions = function () { return this._waypointSplinePositions; };
        WaypointTargetManager.prototype.getControlPointTransforms = function () { return this._waypointTransformNodes; };
        WaypointTargetManager.prototype.start = function () {
            if (this._waypointSplinePositions != null && this.drawLines === true) {
                this._waypointMeshLines = BABYLON.MeshBuilder.CreateLines((this.transform.name + ".SplineMesh"), { points: this._waypointSplinePositions }, this.scene);
                this._waypointMeshLines.parent = this.transform;
                this._waypointMeshLines.color = this.lineColor;
                this._waypointMeshLines.position.y += this.lineHeight;
            }
        };
        WaypointTargetManager.prototype.destroy = function () {
            this.lineColor = null;
            this._waypointSplineCurve = null;
            this._waypointTransformNodes = null;
            this._waypointSplinePositions = null;
            if (this._waypointMeshLines != null) {
                this._waypointMeshLines.dispose();
                this._waypointMeshLines = null;
            }
        };
        return WaypointTargetManager;
    }(BABYLON.ScriptComponent));
    PROJECT.WaypointTargetManager = WaypointTargetManager;
})(PROJECT || (PROJECT = {}));
var BABYLON;
(function (BABYLON) {
    /**
     * Babylon metadata parser class (Internal use only)
     * @class PerlinNoiseGenerator - All rights reserved (c) 2020 Mackey Kinard
     */
    var PerlinNoiseGenerator = /** @class */ (function () {
        function PerlinNoiseGenerator() {
        }
        PerlinNoiseGenerator.rand_vect = function () {
            var theta = Math.random() * 2 * Math.PI;
            return { x: Math.cos(theta), y: Math.sin(theta) };
        };
        PerlinNoiseGenerator.dot_prod_grid = function (x, y, vx, vy) {
            var g_vect;
            var d_vect = { x: x - vx, y: y - vy };
            if (PerlinNoiseGenerator.gradients[[vx, vy]]) {
                g_vect = PerlinNoiseGenerator.gradients[[vx, vy]];
            }
            else {
                g_vect = PerlinNoiseGenerator.rand_vect();
                PerlinNoiseGenerator.gradients[[vx, vy]] = g_vect;
            }
            return d_vect.x * g_vect.x + d_vect.y * g_vect.y;
        };
        PerlinNoiseGenerator.smootherstep = function (x) {
            return 6 * Math.pow(x, 5) - 15 * Math.pow(x, 4) + 10 * Math.pow(x, 3);
        };
        PerlinNoiseGenerator.interp = function (x, a, b) {
            return a + PerlinNoiseGenerator.smootherstep(x) * (b - a);
        };
        /** Seed perlin noise generator */
        PerlinNoiseGenerator.seed = function () {
            PerlinNoiseGenerator.gradients = {};
        };
        /** Generate perlin noise value from 2D coordinates. (Note: Use normalized input values) */
        PerlinNoiseGenerator.generate = function (x, y) {
            var xf = Math.floor(x);
            var yf = Math.floor(y);
            //interpolate
            var tl = PerlinNoiseGenerator.dot_prod_grid(x, y, xf, yf);
            var tr = PerlinNoiseGenerator.dot_prod_grid(x, y, xf + 1, yf);
            var bl = PerlinNoiseGenerator.dot_prod_grid(x, y, xf, yf + 1);
            var br = PerlinNoiseGenerator.dot_prod_grid(x, y, xf + 1, yf + 1);
            var xt = PerlinNoiseGenerator.interp(x - xf, tl, tr);
            var xb = PerlinNoiseGenerator.interp(x - xf, bl, br);
            return PerlinNoiseGenerator.interp(y - yf, xt, xb);
        };
        PerlinNoiseGenerator.gradients = {};
        return PerlinNoiseGenerator;
    }());
    BABYLON.PerlinNoiseGenerator = PerlinNoiseGenerator;
})(BABYLON || (BABYLON = {}));
BABYLON.PerlinNoiseGenerator.seed();
var MVRK;
(function (MVRK) {
    /**
    * Babylon Script Component
    * @class CaptionManager
    */
    var CaptionManager = /** @class */ (function (_super) {
        __extends(CaptionManager, _super);
        function CaptionManager() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CaptionManager.prototype.awake = function () {
            /* Init component function */
            var DOMelement = this.getProperty("DomElement");
            var fontType = this.getProperty("fontType");
            var fontSize = this.getProperty("fontSize");
            var fontHexColor = this.getProperty("fontHexColor");
            var fontOutlineColor = this.getProperty("fontOutlineColor");
            var debugLanguageCode = this.getProperty("debugLanguageCode");
            // Enable debug language locale for testing
            if (debugLanguageCode != null && debugLanguageCode !== "") {
                BABYLON.SceneManager.SetWindowState("debugLocale", debugLanguageCode.toLowerCase());
            }
            // Make sure this element doesn't already exist
            if (!document.getElementById(DOMelement)) {
                var captionsDiv = document.createElement("div");
                captionsDiv.id = DOMelement;
                if (fontType)
                    captionsDiv.style.fontFamily = fontType;
                if (fontSize)
                    captionsDiv.style.fontSize = fontSize + "pt";
                captionsDiv.style.zIndex = "2";
                captionsDiv.style.position = "absolute";
                captionsDiv.style.bottom = "100px";
                captionsDiv.style.left = "0";
                captionsDiv.style.right = "0";
                captionsDiv.style.margin = "0 auto";
                captionsDiv.style.textAlign = "center";
                captionsDiv.style.fontWeight = "bold";
                captionsDiv.style.userSelect = "none";
                captionsDiv.style.pointerEvents = "none";
                captionsDiv.style.color = fontHexColor;
                if (fontOutlineColor) {
                    captionsDiv.style.textShadow = "0 0 1px " + fontOutlineColor + ", 0 0 1px " + fontOutlineColor + ", 0 0 1px " + fontOutlineColor + ", 0 0 1px " + fontOutlineColor;
                }
                document.body.append(captionsDiv);
            }
        };
        return CaptionManager;
    }(BABYLON.ScriptComponent));
    MVRK.CaptionManager = CaptionManager;
})(MVRK || (MVRK = {}));
var MVRK;
(function (MVRK) {
    /**
    * Babylon Script Component
    * @class CaptionSystem
    */
    var CaptionSystem = /** @class */ (function (_super) {
        __extends(CaptionSystem, _super);
        function CaptionSystem(transform, scene, properties) {
            var _this = _super.call(this, transform, scene, properties) || this;
            _this.captionType = 0;
            _this.displayTimer = 5;
            _this.domElement = null;
            _this.textTracks = null;
            _this.userLocale = "en";
            _this.logCaptions = false;
            _this.m_captionSource = null;
            _this.m_captionTimer = 0;
            /** Register handler that is triggered on vtt caption cue changed */
            _this.onUpdateCaptionObservable = new BABYLON.Observable();
            if (_this.transform.metadata == null)
                _this.transform.metadata = {};
            // ..
            // Flag WebVTT Support Required
            // ..            
            _this.transform.metadata.vtt = true;
            return _this;
        }
        CaptionSystem.prototype.getUserLocale = function () { return this.userLocale; };
        CaptionSystem.prototype.getCaptionType = function () { return this.captionType; };
        CaptionSystem.prototype.awake = function () { this.awakeCaptionSystem(); };
        CaptionSystem.prototype.start = function () { this.startCaptionSystem(); };
        CaptionSystem.prototype.update = function () { this.updateCaptionSystem(); };
        CaptionSystem.prototype.destroy = function () { this.destroyCaptionSystem(); };
        CaptionSystem.prototype.awakeCaptionSystem = function () {
            var _a;
            this.captionType = this.getProperty("captionType", this.captionType);
            this.displayTimer = this.getProperty("displayTimer", this.displayTimer);
            this.domElement = this.getProperty("domElement", this.domElement);
            this.textTracks = this.getProperty("textTracks", this.textTracks);
            this.logCaptions = this.getProperty("logCaptions", this.logCaptions);
            this.userLocale = BABYLON.SceneManager.GetWindowState("debugLocale") || ((_a = MVRK.System.GetUserInfo()) === null || _a === void 0 ? void 0 : _a.locale) || this.userLocale;
            // HACK: Quick Fix
            if (this.userLocale === "zh")
                this.userLocale = "ch";
            else if (this.userLocale === "ja")
                this.userLocale = "jp";
        };
        CaptionSystem.prototype.startCaptionSystem = function () {
            if (this.captionType === 0) {
                this.m_captionSource = this.getComponent("BABYLON.WebVideoPlayer");
                if (this.m_captionSource == null)
                    BABYLON.Tools.Warn("Failed to locate web video player component for: " + this.transform.name);
            }
            else {
                this.m_captionSource = this.getComponent("BABYLON.AudioSource");
                if (this.m_captionSource == null)
                    BABYLON.Tools.Warn("Failed to locate audio source component for: " + this.transform.name);
            }
            if (this.m_captionSource != null)
                this.attachCaptionSystem();
            this.postCaptionMessage(""); // Note: Post Initial Clear Screen Message
        };
        CaptionSystem.prototype.updateCaptionSystem = function () {
            if (this.displayTimer > 0 && this.m_captionTimer > 0) {
                this.m_captionTimer += this.getDeltaSeconds();
                if (this.m_captionTimer >= this.displayTimer) {
                    this.postCaptionMessage(""); // Note: Post Timeout Clear Screen Message
                }
            }
        };
        CaptionSystem.prototype.destroyCaptionSystem = function () {
            this.textTracks = null;
            this.m_captionSource = null;
            this.m_captionElement = null;
            this.onUpdateCaptionObservable.clear();
            this.onUpdateCaptionObservable = null;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////
        // Private Worker Functions
        ///////////////////////////////////////////////////////////////////////////////////////////
        CaptionSystem.prototype.attachCaptionSystem = function () {
            var _this = this;
            var _a, _b;
            var rootUrl = BABYLON.SceneManager.GetRootUrl(this.scene);
            if (this.m_captionSource != null && this.userLocale != null && this.userLocale !== "") {
                if (this.textTracks != null && this.textTracks.length > 0) {
                    for (var index = 0; index < this.textTracks.length; index++) {
                        var textTrack = this.textTracks[index];
                        if (textTrack.trackLanguage === this.userLocale) {
                            var trackElement = document.createElement("track");
                            trackElement.src = (rootUrl + textTrack.trackAsset.filename);
                            trackElement.kind = this.formatTextTrackKind(textTrack.trackKind);
                            trackElement.label = textTrack.trackLabel;
                            trackElement.srclang = textTrack.trackLanguage;
                            trackElement.default = false;
                            trackElement.addEventListener("cuechange", function (event) {
                                var target = event.target;
                                if (target != null && target.track != null && target.track.activeCues != null && target.track.activeCues[0] != null) {
                                    var cue = target.track.activeCues[0];
                                    if (cue.text != null && cue.text !== "") {
                                        if (_this.logCaptions === true)
                                            console.log(cue.text);
                                        _this.postCaptionMessage(cue.text); // Note: Post Caption System Track Message
                                    }
                                }
                            });
                            // ..
                            // Attach Track Element To Source
                            // ..
                            if (this.m_captionSource instanceof BABYLON.WebVideoPlayer) {
                                (_a = this.m_captionSource.getVideoElement()) === null || _a === void 0 ? void 0 : _a.appendChild(trackElement);
                            }
                            else if (this.m_captionSource instanceof BABYLON.AudioSource) {
                                (_b = this.m_captionSource.getAudioElement()) === null || _b === void 0 ? void 0 : _b.appendChild(trackElement);
                            }
                            break;
                        }
                    }
                }
            }
            // ..
            // Setup Default Caption System Locale
            // ..
            if (this.m_captionSource instanceof BABYLON.WebVideoPlayer) {
                var video = this.m_captionSource.getVideoElement();
                if (video != null) {
                    MVRK.CaptionSystem.EnableDefaultTextTrack(video, true);
                }
                else {
                    BABYLON.Tools.Warn("Null html video element for: " + this.transform.name);
                }
            }
            else if (this.m_captionSource instanceof BABYLON.AudioSource) {
                var audio = this.m_captionSource.getAudioElement();
                if (audio != null) {
                    MVRK.CaptionSystem.EnableDefaultTextTrack(audio, true);
                }
                else {
                    BABYLON.Tools.Warn("Null html audio element for: " + this.transform.name);
                }
            }
        };
        CaptionSystem.prototype.postCaptionMessage = function (message) {
            this.m_captionTimer = 0;
            if (message != null) {
                if (this.onUpdateCaptionObservable.hasObservers() === true) {
                    this.onUpdateCaptionObservable.notifyObservers(message);
                }
                if (this.domElement != null) {
                    if (this.m_captionElement == null)
                        this.m_captionElement = document.getElementById(this.domElement);
                    if (this.m_captionElement != null)
                        this.m_captionElement.innerHTML = message;
                }
                if (message !== "")
                    this.m_captionTimer = 0.00001; // Note: Set Very Small Timer Start Value
            }
        };
        CaptionSystem.prototype.formatTextTrackKind = function (kind) {
            var result = "subtitles";
            switch (kind) {
                case 0:
                    result = "subtitles";
                    break;
                case 1:
                    result = "captions";
                    break;
                case 2:
                    result = "descriptions";
                    break;
                case 3:
                    result = "chapters";
                    break;
                case 4:
                    result = "metadata";
                    break;
            }
            return result;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////
        // Static Helper Functions
        ///////////////////////////////////////////////////////////////////////////////////////////
        CaptionSystem.EnableDefaultTextTrack = function (source, enable) {
            if (source != null && source.textTracks != null && source.textTracks.length > 0) {
                source.textTracks[0].mode = (enable === true) ? "showing" : "disabled";
            }
        };
        return CaptionSystem;
    }(BABYLON.ScriptComponent));
    MVRK.CaptionSystem = CaptionSystem;
})(MVRK || (MVRK = {}));
var MVRK;
(function (MVRK) {
    /**
    * Babylon Script Component
    * @class SceneSoundSystem
    */
    var SceneSoundSystem = /** @class */ (function (_super) {
        __extends(SceneSoundSystem, _super);
        function SceneSoundSystem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(SceneSoundSystem, "MUSIC", {
            get: function () { return SceneSoundSystem._MUSIC; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SceneSoundSystem, "SFX", {
            get: function () { return SceneSoundSystem._SFX; },
            enumerable: false,
            configurable: true
        });
        SceneSoundSystem.prototype.start = function () {
            var _a;
            var musicNode = this.getChildNode("MUSIC");
            if (musicNode != null)
                SceneSoundSystem._MUSIC = BABYLON.SceneManager.FindScriptComponent(musicNode, "MVRK.SoundManager");
            var soundNode = this.getChildNode("SFX");
            if (soundNode != null)
                SceneSoundSystem._SFX = BABYLON.SceneManager.FindScriptComponent(soundNode, "MVRK.SoundManager");
            var defaultMusicTrack = this.getProperty("defaultMusicTrack");
            if (defaultMusicTrack != null && defaultMusicTrack !== "") {
                (_a = SceneSoundSystem.MUSIC) === null || _a === void 0 ? void 0 : _a.playTrack(defaultMusicTrack);
            }
        };
        SceneSoundSystem._MUSIC = null;
        SceneSoundSystem._SFX = null;
        return SceneSoundSystem;
    }(BABYLON.ScriptComponent));
    MVRK.SceneSoundSystem = SceneSoundSystem;
})(MVRK || (MVRK = {}));
var MVRK;
(function (MVRK) {
    /**
    * Babylon Script Component
    * @class SoundManager
    */
    var SoundManager = /** @class */ (function (_super) {
        __extends(SoundManager, _super);
        function SoundManager() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.isReady = false;
            _this.groupName = null;
            _this.m_soundMap = null;
            _this.m_soundList = null;
            return _this;
        }
        SoundManager.prototype.getIsReady = function () { return this.isReady; };
        SoundManager.prototype.getGroupName = function () { return this.groupName; };
        SoundManager.prototype.awake = function () {
            this.groupName = this.getProperty("groupName", this.transform.name); // Note: Default Transform Group Name
            this.m_soundMap = new Map();
            this.m_soundList = [];
            this.isReady = false;
        };
        SoundManager.prototype.start = function () {
            var audioTransforms = this.transform.getChildren(null, true);
            if (audioTransforms != null && audioTransforms.length > 0) {
                for (var index = 0; index < audioTransforms.length; index++) {
                    var audioTrackNode = audioTransforms[index];
                    var audioSource = BABYLON.SceneManager.FindScriptComponent(audioTrackNode, "BABYLON.AudioSource");
                    if (audioSource != null) {
                        this.m_soundMap.set(audioTrackNode.name, audioSource);
                        this.m_soundList.push(audioSource);
                    }
                }
            }
        };
        SoundManager.prototype.update = function () { };
        SoundManager.prototype.destroy = function () {
            this.m_soundList = null;
            this.m_soundMap.clear();
            this.m_soundMap = null;
        };
        ///////////////////////////////////////////////////
        // Public Sound Manager Helpers
        //////////////////////////////////////////////////
        /**
         * Play the sound track by name
         * @param time (optional) Start the sound after X seconds. Start immediately (0) by default.
         * @param offset (optional) Start the sound at a specific time in seconds
         * @param length (optional) Sound duration (in seconds)
         */
        SoundManager.prototype.playTrack = function (name, time, offset, length) {
            var _a;
            return (_a = this.getAudioSource(name)) === null || _a === void 0 ? void 0 : _a.play(time, offset, length);
        };
        /**
         * Pause the sound track by name
         * @param time (optional) Start the sound after X seconds. Start immediately (0) by default.
         */
        SoundManager.prototype.pauseTrack = function (name) {
            var _a;
            return (_a = this.getAudioSource(name)) === null || _a === void 0 ? void 0 : _a.pause();
        };
        /**
         * Pause the sound for all tracks in the group
         * @param time (optional) Stop the sound after X seconds. Stop immediately (0) by default.
         */
        SoundManager.prototype.pauseAllTracks = function () {
            var _a;
            if (this.m_soundList != null && this.m_soundList.length > 0) {
                for (var index = 0; index < this.m_soundList.length; index++) {
                    (_a = this.m_soundList[index]) === null || _a === void 0 ? void 0 : _a.pause();
                }
            }
        };
        /**
         * Stop the sound track by name
         * @param time (optional) Start the sound after X seconds. Start immediately (0) by default.
         */
        SoundManager.prototype.stopTrack = function (name, time) {
            var _a;
            return (_a = this.getAudioSource(name)) === null || _a === void 0 ? void 0 : _a.stop(time);
        };
        /**
         * Stop the sound for all tracks in the group
         * @param time (optional) Stop the sound after X seconds. Stop immediately (0) by default.
         */
        SoundManager.prototype.stopAllTracks = function (time) {
            var _a;
            if (this.m_soundList != null && this.m_soundList.length > 0) {
                for (var index = 0; index < this.m_soundList.length; index++) {
                    (_a = this.m_soundList[index]) === null || _a === void 0 ? void 0 : _a.stop(time);
                }
            }
        };
        /**
         * Mute the sound track by name
         * @param time (optional) Start the sound after X seconds. Start immediately (0) by default.
         */
        SoundManager.prototype.muteTrack = function (name, time) {
            var _a;
            return (_a = this.getAudioSource(name)) === null || _a === void 0 ? void 0 : _a.mute(time);
        };
        /**
         * Unmute the sound track by name
         * @param time (optional) Start the sound after X seconds. Start immediately (0) by default.
         */
        SoundManager.prototype.unmuteTrack = function (name, time) {
            var _a;
            return (_a = this.getAudioSource(name)) === null || _a === void 0 ? void 0 : _a.unmute(time);
        };
        /**
         * Mutes the volume for all sound tracks in the group
         * @param time Define time for gradual change to new volume
         */
        SoundManager.prototype.muteAllTracks = function (time) {
            var _a;
            if (this.m_soundList != null && this.m_soundList.length > 0) {
                for (var index = 0; index < this.m_soundList.length; index++) {
                    (_a = this.m_soundList[index]) === null || _a === void 0 ? void 0 : _a.mute(time);
                }
            }
        };
        /**
         * Unmutes the volume for all sound tracks in the group
         * @param time Define time for gradual change to new volume
         */
        SoundManager.prototype.unmuteAllTracks = function (time) {
            var _a;
            if (this.m_soundList != null && this.m_soundList.length > 0) {
                for (var index = 0; index < this.m_soundList.length; index++) {
                    (_a = this.m_soundList[index]) === null || _a === void 0 ? void 0 : _a.unmute(time);
                }
            }
        };
        /**
         * Sets the volume for all sound tracks in the group
         * @param volume Define the new volume of the sound
         * @param time Define time for gradual change to new volume
         */
        SoundManager.prototype.setGroupVolume = function (volume, time) {
            var _a;
            if (this.m_soundList != null && this.m_soundList.length > 0) {
                for (var index = 0; index < this.m_soundList.length; index++) {
                    (_a = this.m_soundList[index]) === null || _a === void 0 ? void 0 : _a.setVolume(volume, time);
                }
            }
        };
        /**
         * Get a sound source by name
         */
        SoundManager.prototype.getAudioSource = function (name) {
            return this.m_soundMap.get(name);
        };
        return SoundManager;
    }(BABYLON.ScriptComponent));
    MVRK.SoundManager = SoundManager;
})(MVRK || (MVRK = {}));
var MVRK;
(function (MVRK) {
    /**
    * Babylon Script Component
    * @class VideoController
    */
    var VideoController = /** @class */ (function (_super) {
        __extends(VideoController, _super);
        function VideoController() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        VideoController.prototype.awake = function () {
            /* Init component function */
        };
        VideoController.prototype.start = function () {
            /* Start render loop function */
        };
        VideoController.prototype.update = function () {
            /* Update render loop function */
        };
        VideoController.prototype.late = function () {
            /* Late update render loop function */
        };
        VideoController.prototype.after = function () {
            /* After render loop function */
        };
        VideoController.prototype.destroy = function () {
            /* Destroy component function */
        };
        return VideoController;
    }(BABYLON.ScriptComponent));
    MVRK.VideoController = VideoController;
})(MVRK || (MVRK = {}));
var MVRK;
(function (MVRK) {
    /**
    * Babylon Script Component
    * @class InsideNotification
    */
    var InsideNotification = /** @class */ (function (_super) {
        __extends(InsideNotification, _super);
        function InsideNotification() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.abstractMesh = null;
            return _this;
        }
        InsideNotification.prototype.awake = function () {
            this.abstractMesh = this.getAbstractMesh();
        };
        InsideNotification.prototype.update = function () {
            if (MVRK.InsideNotification.CurrentRoom !== this.transform.name) {
                var cameraPos = this.scene.activeCamera.globalPosition;
                if (this.pointIsInside(cameraPos)) {
                    MVRK.InsideNotification.CurrentRoom = this.transform.name;
                    var JSON_1 = '{"command":"location","param1":"' + this.transform.name + '"}';
                    BABYLON.SceneManager.PostWindowMessage(JSON_1, '*');
                }
            }
            //console.warn("MVRK.InsideNotification: " + this.transform.name);
        };
        InsideNotification.prototype.pointIsInside = function (point) {
            if (this.abstractMesh != null) {
                var boundInfo = this.abstractMesh.getBoundingInfo();
                var max = boundInfo.boundingBox.maximumWorld;
                var min = boundInfo.boundingBox.minimumWorld;
                if (point.x < min.x || point.x > max.x) {
                    return false;
                }
                if (point.y < min.y || point.y > max.y) {
                    return false;
                }
                if (point.z < min.z || point.z > max.z) {
                    return false;
                }
            }
            return true;
        };
        InsideNotification.CurrentRoom = "";
        return InsideNotification;
    }(BABYLON.ScriptComponent));
    MVRK.InsideNotification = InsideNotification;
})(MVRK || (MVRK = {}));
var MVRK;
(function (MVRK) {
    /**
    * Babylon Script Component
    * @class PopupTrigger
    */
    var PopupTrigger = /** @class */ (function (_super) {
        __extends(PopupTrigger, _super);
        function PopupTrigger() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.triggerType = "vod";
            _this.triggerParam = "defaultParam";
            _this.triggerFocus = null;
            _this.abstractMesh = null;
            /** Register handler that is triggered when the mesh has been picked */
            _this.onPickTriggerObservable = new BABYLON.Observable();
            return _this;
        }
        PopupTrigger.prototype.awake = function () {
            var _this = this;
            this.triggerParam = this.getProperty("triggerParam", this.triggerParam);
            this.triggerType = this.getProperty("triggerType", this.triggerType);
            var nodeFocusData = this.getProperty("triggerFocus");
            if (nodeFocusData != null)
                this.triggerFocus = BABYLON.Utilities.ParseTransformByID(nodeFocusData, this.scene);
            this.abstractMesh = this.getAbstractMesh();
            var JSON = '{"command":"' + this.triggerType + '","param":"' + this.triggerParam + '"}';
            if (this.abstractMesh != null) {
                this.abstractMesh.actionManager = new BABYLON.ActionManager(this.scene);
            }
            if (this.abstractMesh != null) {
                this.abstractMesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
                    trigger: BABYLON.ActionManager.OnPickTrigger
                }, function () {
                    if (_this.getComponent("PROJECT.LerpObject") == null) {
                        if (!!_this.triggerFocus) {
                            _this.gradualFocus();
                        }
                        if (_this.onPickTriggerObservable.hasObservers() === true) {
                            _this.onPickTriggerObservable.notifyObservers(_this.abstractMesh);
                        }
                        BABYLON.SceneManager.PostWindowMessage(JSON, '*');
                    }
                }));
            }
        };
        PopupTrigger.prototype.sendMessage = function () {
            var JSON = '{"command":"' + this.triggerType + '","param":"' + this.triggerParam + '"}';
            BABYLON.SceneManager.PostWindowMessage(JSON, '*');
        };
        PopupTrigger.prototype.registerNewTrigger = function () {
            var _this = this;
            var JSON = '{"command":"' + this.triggerType + '","param":"' + this.triggerParam + '"}';
            if (this.abstractMesh != null) {
                this.abstractMesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
                    trigger: BABYLON.ActionManager.OnPickTrigger
                }, function () {
                    if (!!_this.triggerFocus) {
                        _this.gradualFocus();
                    }
                    if (_this.onPickTriggerObservable.hasObservers() === true) {
                        _this.onPickTriggerObservable.notifyObservers(_this.abstractMesh);
                    }
                    BABYLON.SceneManager.PostWindowMessage(JSON, '*');
                }));
            }
        };
        PopupTrigger.prototype.gradualFocus = function () {
            var camera = this.scene.activeCamera;
            var empty = new BABYLON.Mesh("empty", this.scene);
            empty.position = camera.position.clone();
            empty.rotation = camera["rotation"].clone();
            empty.movePOV(0, 0, -2);
            var vecSource = empty.position.clone();
            var vecDest = this.triggerFocus.absolutePosition;
            this.scene.activeCamera["lockedTarget"] = vecSource;
            empty.dispose();
            this.lerpCameraView(vecSource, vecDest, 0);
        };
        PopupTrigger.prototype.lerpCameraView = function (vecSource, vecDest, amount) {
            var _this = this;
            var newVec = BABYLON.Vector3.Lerp(vecSource, vecDest, amount);
            if (amount < 1) {
                setTimeout(function () {
                    var newAmount = amount + 0.01;
                    _this.scene.activeCamera["lockedTarget"] = newVec;
                    _this.lerpCameraView(vecSource, vecDest, newAmount);
                }, 5);
            }
            else {
                this.scene.activeCamera["lockedTarget"] = null;
            }
        };
        return PopupTrigger;
    }(BABYLON.ScriptComponent));
    MVRK.PopupTrigger = PopupTrigger;
})(MVRK || (MVRK = {}));
var MVRK;
(function (MVRK) {
    /**
    * Babylon Script Component State Class
    * @class State
    */
    var State = /** @class */ (function () {
        function State() {
        }
        State.prototype.tick = function () { };
        ;
        return State;
    }());
    MVRK.State = State;
    /**
    * Babylon Stateful Script Component
    * @class StatefulScriptComponent
    */
    var StatefulScriptComponent = /** @class */ (function (_super) {
        __extends(StatefulScriptComponent, _super);
        function StatefulScriptComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._currentState = null;
            /** Register handler that is triggered when the animation ik setup has been triggered */
            _this.onStateChangeObservable = new BABYLON.Observable();
            return _this;
        }
        /** Gets the current script component state */
        StatefulScriptComponent.prototype.getCurrentState = function () { return this._currentState; };
        /** Sets the new script component state */
        StatefulScriptComponent.prototype.setState = function (newState, forced) {
            if (this._currentState === newState) {
                return false;
            }
            if (forced != null && forced == true) {
                if (this._currentState)
                    this._currentState.onExit();
                this._currentState = newState;
                newState.onEnter();
                if (this.onStateChangeObservable.hasObservers() === true) {
                    this.onStateChangeObservable.notifyObservers(this._currentState);
                }
                return true;
            }
            else if (newState.canChangeState()) {
                if (this._currentState)
                    this._currentState.onExit();
                this._currentState = newState;
                newState.onEnter();
                if (this.onStateChangeObservable.hasObservers() === true) {
                    this.onStateChangeObservable.notifyObservers(this._currentState);
                }
                return true;
            }
            else {
                newState.onStateChangeFail();
                return false;
            }
        };
        return StatefulScriptComponent;
    }(BABYLON.ScriptComponent));
    MVRK.StatefulScriptComponent = StatefulScriptComponent;
})(MVRK || (MVRK = {}));
var MVRK;
(function (MVRK) {
    /**
    * Babylon Script Component
    * @class BillboardMesh
    */
    var BillboardMesh = /** @class */ (function (_super) {
        __extends(BillboardMesh, _super);
        function BillboardMesh() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BillboardMesh.prototype.awake = function () {
            /* Init component function */
            this.camera = this.scene.activeCamera;
        };
        BillboardMesh.prototype.update = function () {
            /* Update render loop function */
            var absCameraPos = this.camera.globalPosition;
            var absTransformPos = this.transform.absolutePosition;
            var lookDirection = absCameraPos.subtract(absTransformPos).normalize().scale(-1);
            this.transform.lookAt(absTransformPos.add(lookDirection), null, null, null, BABYLON.Space.WORLD);
        };
        return BillboardMesh;
    }(BABYLON.ScriptComponent));
    MVRK.BillboardMesh = BillboardMesh;
})(MVRK || (MVRK = {}));
var MVRK;
(function (MVRK) {
    /**
    * Babylon Script Component
    * @class BlinkManager
    */
    var BlinkManager = /** @class */ (function (_super) {
        __extends(BlinkManager, _super);
        function BlinkManager() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.enableBlinking = false;
            _this.blinkingState = false;
            _this.blinkingTimer = 0;
            _this.blinkTimeout = 0.5;
            /** Register handler that is triggered when the blink change has been triggered */
            _this.onBlinkUpdateObservable = new BABYLON.Observable();
            return _this;
        }
        BlinkManager.prototype.awake = function () {
            this.blinkTimeout = this.getProperty("blinkTimeout", this.blinkTimeout);
        };
        BlinkManager.prototype.update = function () {
            if (this.enableBlinking === true) {
                this.blinkingTimer += this.getDeltaSeconds();
                if (this.blinkingTimer >= this.blinkTimeout) {
                    this.blinkingTimer = 0;
                    this.blinkingState = !this.blinkingState;
                    if (this.onBlinkUpdateObservable.hasObservers() === true) {
                        this.onBlinkUpdateObservable.notifyObservers(this.blinkingState);
                    }
                }
            }
        };
        BlinkManager.prototype.destroy = function () {
            this.onBlinkUpdateObservable.clear();
            this.onBlinkUpdateObservable = null;
        };
        BlinkManager.prototype.enableBlinkMode = function (blinking) {
            this.blinkingTimer = 0;
            this.blinkingState = false;
            this.enableBlinking = blinking;
        };
        return BlinkManager;
    }(BABYLON.ScriptComponent));
    MVRK.BlinkManager = BlinkManager;
})(MVRK || (MVRK = {}));
var MVRK;
(function (MVRK) {
    /**
    * Babylon Script Component
    * @class FloatingAnimation
    */
    var FloatingAnimation = /** @class */ (function (_super) {
        __extends(FloatingAnimation, _super);
        function FloatingAnimation() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.floatSpeed = 1.0;
            _this.floatDistance = 0.2;
            _this.randomOffset = 0.1;
            _this.initPosition = new BABYLON.Vector3(0, 0, 0);
            _this.floatingVector = new BABYLON.Vector3(0, 0, 0);
            return _this;
        }
        FloatingAnimation.prototype.awake = function () {
            this.floatSpeed = this.getProperty("floatSpeed", this.floatSpeed);
            this.floatDistance = this.getProperty("floatDistance", this.floatDistance);
            this.randomOffset = BABYLON.Scalar.RandomRange(-Math.PI, Math.PI);
            this.initPosition.copyFrom(this.transform.position);
        };
        FloatingAnimation.prototype.update = function () {
            var time = this.getGameTime();
            this.floatingVector.set(0, Math.sin((time + this.randomOffset) * this.floatSpeed) * this.floatDistance, 0);
            this.floatingVector.addToRef(this.initPosition, this.transform.position);
        };
        FloatingAnimation.prototype.destroy = function () {
            this.initPosition = null;
            this.floatingVector = null;
        };
        return FloatingAnimation;
    }(BABYLON.ScriptComponent));
    MVRK.FloatingAnimation = FloatingAnimation;
})(MVRK || (MVRK = {}));
var MVRK;
(function (MVRK) {
    /**
    * Babylon Script Component
    * @class RotateTransform
    */
    var RotateTransform = /** @class */ (function (_super) {
        __extends(RotateTransform, _super);
        function RotateTransform() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.rotateSpeedX = 0.0;
            _this.rotateSpeedY = 0.0;
            _this.rotateSpeedZ = 1.0;
            return _this;
        }
        RotateTransform.prototype.awake = function () {
            this.rotateSpeedX = this.getProperty("rotateSpeedX", this.rotateSpeedX);
            this.rotateSpeedY = this.getProperty("rotateSpeedY", this.rotateSpeedY);
            this.rotateSpeedZ = this.getProperty("rotateSpeedZ", this.rotateSpeedZ);
            // Note: Setup Transform To Use Euler Rotations
            if (this.transform.rotation == null) {
                this.transform.rotation = new BABYLON.Vector3(0, 0, 0);
            }
            if (this.transform.rotationQuaternion != null) {
                this.transform.rotationQuaternion.toEulerAnglesToRef(this.transform.rotation);
                this.transform.rotationQuaternion = null;
            }
        };
        RotateTransform.prototype.update = function () {
            var deltaTime = this.getDeltaSeconds();
            if (this.rotateSpeedX !== 0)
                this.transform.rotation.x += (this.rotateSpeedX * deltaTime);
            if (this.rotateSpeedY !== 0)
                this.transform.rotation.y += (this.rotateSpeedY * deltaTime);
            if (this.rotateSpeedZ !== 0)
                this.transform.rotation.z += (this.rotateSpeedZ * deltaTime);
        };
        return RotateTransform;
    }(BABYLON.ScriptComponent));
    MVRK.RotateTransform = RotateTransform;
})(MVRK || (MVRK = {}));
var MVRK;
(function (MVRK) {
    /**
    * Babylon Script Component
    * @class RuntimeTexture
    */
    var RuntimeTexture = /** @class */ (function (_super) {
        __extends(RuntimeTexture, _super);
        function RuntimeTexture() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.m_dynamicTexture = null;
            _this.m_dynamicMaterial = null;
            return _this;
        }
        RuntimeTexture.prototype.awake = function () {
            var textureUrl = this.getProperty("textureUrl");
            var invertAxis = this.getProperty("invertAxis", false);
            var genMipmaps = this.getProperty("genMipmaps", false);
            var materialIndex = this.getProperty("materialIndex", 0);
            var abstractMesh = this.getAbstractMesh();
            if (abstractMesh != null) {
                if (abstractMesh.material instanceof BABYLON.MultiMaterial) {
                    var mmat1 = abstractMesh.material.clone(abstractMesh.material.name + "." + abstractMesh.name);
                    this.m_dynamicMaterial = mmat1.subMaterials[materialIndex].clone(mmat1.subMaterials[materialIndex].name + "_" + abstractMesh.name);
                    mmat1.subMaterials[materialIndex] = this.m_dynamicMaterial;
                    abstractMesh.material = mmat1;
                }
                else {
                    this.m_dynamicMaterial = abstractMesh.material.clone(abstractMesh.material.name + "." + abstractMesh.name);
                    abstractMesh.material = this.m_dynamicMaterial;
                }
                this.m_dynamicMaterial.unfreeze();
            }
            if (textureUrl != null && textureUrl !== "")
                this.setTextureUrl(textureUrl, invertAxis, genMipmaps);
        };
        RuntimeTexture.prototype.destroy = function () {
            if (this.m_dynamicTexture != null) {
                this.m_dynamicTexture.dispose();
                this.m_dynamicTexture = null;
            }
            if (this.m_dynamicMaterial != null) {
                this.m_dynamicMaterial.dispose();
                this.m_dynamicMaterial = null;
            }
        };
        RuntimeTexture.prototype.setTextureUrl = function (url, invertY, createMipmaps) {
            if (invertY === void 0) { invertY = false; }
            if (createMipmaps === void 0) { createMipmaps = false; }
            if (this.m_dynamicTexture != null) {
                this.m_dynamicTexture.dispose();
                this.m_dynamicTexture = null;
            }
            this.m_dynamicTexture = new BABYLON.Texture(url, this.scene, !createMipmaps, invertY);
            if (this.m_dynamicMaterial != null) {
                if (this.m_dynamicMaterial instanceof BABYLON.PBRMaterial) {
                    this.m_dynamicMaterial.albedoTexture = this.m_dynamicTexture;
                }
                else if (this.m_dynamicMaterial instanceof BABYLON.StandardMaterial) {
                    this.m_dynamicMaterial.diffuseTexture = this.m_dynamicTexture;
                }
            }
        };
        return RuntimeTexture;
    }(BABYLON.ScriptComponent));
    MVRK.RuntimeTexture = RuntimeTexture;
})(MVRK || (MVRK = {}));
var MVRK;
(function (MVRK) {
    /**
    * Babylon Script Component
    * @class SpriteAnimation
    */
    var SpriteAnimation = /** @class */ (function (_super) {
        __extends(SpriteAnimation, _super);
        function SpriteAnimation() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.gridCols = 1;
            _this.gridRows = 1;
            _this.startRow = 1;
            _this.bottomUp = false;
            _this.timeInSeconds = 1;
            _this.colWidth = 0;
            _this.rowHeight = 0;
            _this.animTimer = 0;
            _this.tileIndex = 0;
            _this.tileReset = 0;
            _this.baseTexture = null;
            return _this;
        }
        SpriteAnimation.prototype.awake = function () {
            this.gridCols = this.getProperty("gridCols", this.gridCols);
            this.gridRows = this.getProperty("gridRows", this.gridRows);
            this.startRow = this.getProperty("startRow", this.startRow);
            this.bottomUp = this.getProperty("bottomUp", this.bottomUp);
            this.timeInSeconds = this.getProperty("timeInSeconds", this.timeInSeconds);
            // ..
            this.colWidth = (1 / this.gridCols);
            this.rowHeight = (1 / this.gridRows);
            // ..
            // Set Max Tile Reset Count
            // ..
            this.tileIndex = 0;
            this.tileReset = 0;
            var totalTiles = (this.gridCols * this.gridRows);
            var maxTileCount = this.getProperty("maxTileCount", 0);
            if (maxTileCount > 0 && maxTileCount < totalTiles) {
                this.tileReset = maxTileCount;
            }
            // ..
            // Create Mesh Material Clone
            // ..
            var mesh = this.getAbstractMesh();
            if (mesh != null && mesh.material != null) {
                if (mesh.material instanceof BABYLON.PBRMaterial) {
                    var pbrMaterial = mesh.material.clone(mesh.name + "." + mesh.material.name);
                    this.baseTexture = pbrMaterial.albedoTexture;
                    mesh.material = pbrMaterial;
                }
                else if (mesh.material instanceof BABYLON.StandardMaterial) {
                    var stdMaterial = mesh.material.clone(mesh.name + "." + mesh.material.name);
                    this.baseTexture = stdMaterial.diffuseTexture;
                    mesh.material = stdMaterial;
                }
            }
            // ..
            // Setup Texture Rows And Columns
            // ..
            if (this.baseTexture != null) {
                this.baseTexture.uScale = this.colWidth;
                this.baseTexture.vScale = this.rowHeight;
                // ..
                // Offset Starting Row And Column
                // ..
                var startRowOffset = BABYLON.Scalar.Clamp(((this.startRow - 1) * this.rowHeight));
                this.baseTexture.uOffset = 0;
                this.baseTexture.vOffset = (this.bottomUp === true) ? startRowOffset : ((1 - startRowOffset) - this.rowHeight);
                if (this.startRow > 1) {
                    this.tileIndex = ((this.startRow - 1) * this.gridCols);
                }
            }
        };
        SpriteAnimation.prototype.start = function () {
            this.animTimer = 0;
        };
        SpriteAnimation.prototype.reset = function () {
            if (this.baseTexture != null) {
                this.baseTexture.uOffset = 0;
                this.baseTexture.vOffset = (this.bottomUp === true) ? 0 : (1 - this.rowHeight);
            }
        };
        SpriteAnimation.prototype.update = function () {
            if (this.timeInSeconds > 0) {
                this.animTimer += this.getDeltaSeconds();
                if (this.animTimer >= this.timeInSeconds) {
                    this.animTimer = 0;
                    this.animate();
                }
            }
        };
        SpriteAnimation.prototype.animate = function () {
            // ..
            // Animate Tile Offset
            // ..
            if (this.baseTexture != null) {
                if (this.baseTexture.uOffset >= (1 - this.colWidth)) {
                    this.baseTexture.uOffset = 0;
                    /////////////////////////////////////////////////////////////////
                    // Update Row After Whole Column
                    /////////////////////////////////////////////////////////////////
                    if (this.bottomUp === true) {
                        if (this.baseTexture.vOffset >= (1 - this.rowHeight)) {
                            this.baseTexture.vOffset = 0;
                        }
                        else {
                            this.baseTexture.vOffset += this.rowHeight;
                        }
                    }
                    else {
                        if (this.baseTexture.vOffset <= 0) {
                            this.baseTexture.vOffset = (1 - this.rowHeight);
                        }
                        else {
                            this.baseTexture.vOffset -= this.rowHeight;
                        }
                    }
                    if (this.baseTexture.vOffset < 0 || this.baseTexture.vOffset > 0) {
                        this.baseTexture.vOffset = BABYLON.Scalar.Clamp(this.baseTexture.vOffset);
                    }
                    /////////////////////////////////////////////////////////////////
                }
                else {
                    this.baseTexture.uOffset += this.colWidth;
                }
                if (this.baseTexture.uOffset < 0 || this.baseTexture.uOffset > 0) {
                    this.baseTexture.uOffset = BABYLON.Scalar.Clamp(this.baseTexture.uOffset);
                }
            }
            // ..
            // Validate Max Tile Reset
            // ..            
            if (this.tileReset > 0) {
                this.tileIndex++;
                if (this.tileIndex >= this.tileReset) {
                    this.tileIndex = 0;
                    this.reset();
                }
            }
        };
        SpriteAnimation.prototype.destroy = function () {
            this.baseTexture = null;
        };
        return SpriteAnimation;
    }(BABYLON.ScriptComponent));
    MVRK.SpriteAnimation = SpriteAnimation;
})(MVRK || (MVRK = {}));
var MVRK;
(function (MVRK) {
    /**
     * Babylon scene loader helper class
     * @class SceneLoader
     */
    var SceneLoader = /** @class */ (function () {
        function SceneLoader() {
        }
        SceneLoader.SwitchScene = function (sceneFile) {
            MVRK.SceneLoader.TeleFade.SceneFile = sceneFile;
            BABYLON.SceneManager.RegisterOnShowSceneLoader(function (show) { });
            var blanket = parent.window.document.getElementById("blanket");
            if (blanket == null) {
                blanket = parent.window.document.createElement("div");
                blanket.id = "blanket";
                blanket.style.position = "absolute";
                blanket.style.minHeight = "100%";
                blanket.style.width = "100%";
                blanket.style.height = "100%";
                blanket.style.padding = "0px";
                blanket.style.margin = "0px";
                blanket.style.top = "0";
                blanket.style.left = "0";
                blanket.style.display = "none";
                blanket.style.outline = "none";
                blanket.style.overflow = "hidden";
                blanket.style.opacity = "0";
                blanket.style.zIndex = "-1";
                blanket.style.backgroundColor = "black";
                parent.window.document.body.appendChild(blanket);
            }
            if (blanket != null) {
                blanket.style.zIndex = "2001";
                blanket.style.display = "block";
                blanket.style.opacity = "0";
                MVRK.SceneLoader.FadeToBlack(blanket, MVRK.SceneLoader.TeleFade.Speed);
            }
        };
        SceneLoader.FadeToBlack = function (blanket, speed) {
            if (blanket != null) {
                if (speed < MVRK.SceneLoader.TeleFade.Limit) {
                    BABYLON.SceneManager.SetTimeout(MVRK.SceneLoader.TeleFade.Timeout, function () {
                        blanket.style.opacity = (speed / (MVRK.SceneLoader.TeleFade.Limit - speed)).toString();
                        MVRK.SceneLoader.FadeToBlack(blanket, speed * MVRK.SceneLoader.TeleFade.Multiplier);
                    });
                }
                else {
                    blanket.style.zIndex = "2001";
                    blanket.style.display = "block";
                    blanket.style.opacity = "1";
                    BABYLON.SceneManager.ShowParentLoader(true);
                    BABYLON.SceneManager.LoadSceneFile(MVRK.SceneLoader.TeleFade.SceneFile);
                }
            }
        };
        SceneLoader.FadeToScene = function (blanket, speed) {
            if (blanket != null) {
                if (speed > 0.001) {
                    BABYLON.SceneManager.SetTimeout(MVRK.SceneLoader.TeleFade.Timeout, function () {
                        blanket.style.opacity = (speed / (MVRK.SceneLoader.TeleFade.Limit - speed)).toString();
                        MVRK.SceneLoader.FadeToScene(blanket, speed / MVRK.SceneLoader.TeleFade.Multiplier);
                    });
                }
                else {
                    blanket.style.zIndex = "-1";
                    blanket.style.display = "none";
                    blanket.style.opacity = "0";
                }
            }
        };
        SceneLoader.LoadSceneComplete = function () {
            BABYLON.SceneManager.ShowParentLoader(false);
            var blanket = parent.window.document.getElementById("blanket");
            if (blanket != null)
                MVRK.SceneLoader.FadeToScene(blanket, MVRK.SceneLoader.TeleFade.Limit);
        };
        SceneLoader.TeleFade = { Speed: 0.01, Timeout: 50, Multiplier: 1.8, Limit: 0.4, SceneFile: null };
        return SceneLoader;
    }());
    MVRK.SceneLoader = SceneLoader;
})(MVRK || (MVRK = {}));
var MVRK;
(function (MVRK) {
    /**
     * Babylon system utilities helper class
     * @class System
     */
    var System = /** @class */ (function () {
        function System() {
        }
        System.GetUserInfo = function () {
            var result = null;
            if (window.frameElement != null && parent != null && parent.window != null) {
                if (parent.window["getMVRKUser"]) {
                    result = parent.window["getMVRKUser"]();
                }
            }
            else {
                if (window["getMVRKUser"]) {
                    result = window["getMVRKUser"]();
                }
            }
            if (result == null) {
                result = { firstName: "Default", lastName: "Player", locale: "en", email: null };
            }
            return result;
        };
        System.GetGameLobbyInfo = function () {
            var result = null;
            if (window.frameElement != null && parent != null && parent.window != null) {
                if (parent.window["getGameLobbyInfo"]) {
                    result = parent.window["getGameLobbyInfo"]();
                }
            }
            else {
                if (window["getGameLobbyInfo"]) {
                    result = window["getGameLobbyInfo"]();
                }
            }
            if (result == null) {
                result = { id: "12345" };
            }
            return result;
        };
        return System;
    }());
    MVRK.System = System;
})(MVRK || (MVRK = {}));
var PROJECT;
(function (PROJECT) {
    var PosterRoom = /** @class */ (function (_super) {
        __extends(PosterRoom, _super);
        function PosterRoom() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.slots = [];
            _this.spinTime = 500;
            _this.spinDelay = 200;
            return _this;
        }
        PosterRoom.prototype.awake = function () {
            /* Init component function */
            PosterRoom._instance = this;
            this.elBody = document.body;
            this.elContainer = document.createElement('div');
            this.elContainer.id = 'poster-carousel';
            this.loadStylesheet();
            //REQUEST FOR DATA
            //ON RESPONSE 
            this.initialPosterData([
                this.getRandomPosterSlotData(),
                this.getRandomPosterSlotData(),
                this.getRandomPosterSlotData()
            ]);
        };
        PosterRoom.prototype.initialPosterData = function (posterData) {
            var _this = this;
            this.posterData = posterData;
            this.elPosterElements = document.createElement("div");
            this.elPosterElements.id = "posters";
            this.elContainer.appendChild(this.elPosterElements);
            //prep slots
            this.slots.push(document.createElement('div'), document.createElement('div'), document.createElement('div'));
            this.slots.forEach(function (s, i) {
                s.id = 'slot' + i;
                s.classList.add('slot');
                _this.buildSlot(i, posterData[i]);
                _this.elPosterElements.appendChild(s);
            });
            //this.populatePosters();
            // Hide canvas
            this.scene.getEngine().getRenderingCanvas().style.zIndex = "-1";
            // Set background image
            var backgroundFilename = this.getProperty("backgroundImage").filename;
            this.elBody.style.backgroundImage = "url('scenes/" + backgroundFilename + "')";
            this.addButtons();
            setTimeout(function () {
                _this.elBody.appendChild(_this.elContainer);
                _this.fade(true);
            }, 1000);
        };
        PosterRoom.prototype.fade = function (state) {
            if (state) {
                this.elContainer.classList.add('fade-in');
            }
            else {
                this.elContainer.classList.remove('fade-in');
            }
        };
        PosterRoom.prototype.addButtons = function () {
            var _this = this;
            // Add containers for all buttons
            this.elButtons = document.createElement("div");
            this.elButtons.id = "buttons";
            this.elContainer.appendChild(this.elButtons);
            // Add individual buttons
            var elButtonPrevious = document.createElement("button");
            elButtonPrevious.innerText = "PREVIOUS";
            elButtonPrevious.onclick = function () { _this.previous(); };
            this.elButtons.appendChild(elButtonPrevious);
            var elButtonNext = document.createElement("button");
            elButtonNext.innerText = "NEXT";
            elButtonNext.onclick = function () { _this.next(); };
            this.elButtons.appendChild(elButtonNext);
        };
        PosterRoom.prototype.disableButtons = function () {
            var buttons = this.elButtons.getElementsByTagName('button');
            for (var i = 0; i < buttons.length; i++) {
                var childButton = buttons[i];
                childButton.disabled = true;
            }
        };
        PosterRoom.prototype.enableButtons = function () {
            var buttons = this.elButtons.getElementsByTagName('button');
            for (var i = 0; i < buttons.length; i++) {
                var childButton = buttons[i];
                childButton.disabled = false;
            }
        };
        PosterRoom.prototype.clearAnimations = function (slot) {
            this.getSlot(slot).querySelectorAll('a.poster').forEach(function (el, i) {
                //console.log(el)
                el.classList.remove('forwardAnim', 'backwardAnim');
                el.style.animation = 'none';
                el.style.webkitAnimation = 'none';
                el.offsetHeight;
                el.style.animation = null;
                el.style.webkitAnimationName = null;
                el.style.animationName = null;
            });
        };
        PosterRoom.prototype.getSlot = function (slot) {
            return this.slots[slot];
        };
        PosterRoom.prototype.next = function () {
            var _this = this;
            this.disableButtons();
            this.clearAnimations(1);
            this.getSlot(1).classList.add('fade-out');
            //Animates Center Element out to left
            this.getSlot(1).querySelectorAll('a.poster').forEach(function (el, i) {
                //console.log(el)
                var animationId = i + 1;
                el.classList.add('forwardAnim');
                el.style.webkitAnimationName = 'orbit-next' + animationId;
                el.style.animationName = 'orbit-next' + animationId;
                el.style.webkitAnimationTimingFunction = 'ease-out';
                el.style.animationTimingFunction = 'ease-out';
            });
            this.slots.push(this.slots.shift());
            this.buildSlot(2, this.getRandomPosterSlotData());
            setTimeout(function () {
                _this.getSlot(0).classList.remove('active', 'fade-out');
                _this.getSlot(0).querySelectorAll('a.poster').forEach(function (el, i) {
                    el.style.webkitAnimationName = 'orbit-prev' + (i + 1);
                    el.style.animationName = 'orbit-prev' + (i + 1);
                    el.style.webkitAnimationTimingFunction = 'ease-in';
                    el.style.animationTimingFunction = 'ease-in';
                });
                _this.getSlot(1).classList.add('active');
                _this.getSlot(1).querySelectorAll('a.poster').forEach(function (el, i) {
                    el.classList.add('forwardAnim');
                    el.style.webkitAnimationName = 'orbit-prev' + (i + 1);
                    el.style.animationName = 'orbit-prev' + (i + 1);
                    el.style.webkitAnimationTimingFunction = 'ease-in';
                    el.style.animationTimingFunction = 'ease-in';
                });
                setTimeout(function () {
                    _this.enableButtons();
                }, _this.spinTime);
            }, this.spinTime + this.spinDelay);
        };
        PosterRoom.prototype.previous = function () {
            var _this = this;
            this.disableButtons();
            this.clearAnimations(1);
            this.getSlot(1).classList.add('fade-out');
            //Animates Center Element out to left
            this.getSlot(1).querySelectorAll('a.poster').forEach(function (el, i) {
                var animationId = i + 1;
                el.classList.add('backwardAnim');
                el.style.webkitAnimationName = 'orbit-prev' + animationId;
                el.style.animationName = 'orbit-prev' + animationId;
                el.style.webkitAnimationTimingFunction = 'ease-out';
                el.style.animationTimingFunction = 'ease-out';
            });
            this.slots.unshift(this.slots.pop());
            this.buildSlot(0, this.getRandomPosterSlotData());
            setTimeout(function () {
                _this.getSlot(2).classList.remove('active', 'fade-out');
                _this.getSlot(2).querySelectorAll('a.poster').forEach(function (el, i) {
                    el.style.webkitAnimationName = 'orbit-next' + (i + 1);
                    el.style.animationName = 'orbit-next' + (i + 1);
                    el.style.webkitAnimationTimingFunction = 'ease-out';
                    el.style.animationTimingFunction = 'ease-out';
                });
                _this.getSlot(1).classList.add('active');
                _this.getSlot(1).querySelectorAll('a.poster').forEach(function (el, i) {
                    el.classList.add('backwardAnim');
                    el.style.webkitAnimationName = 'orbit-next' + (i + 1);
                    el.style.animationName = 'orbit-next' + (i + 1);
                    el.style.webkitAnimationTimingFunction = 'ease-in';
                    el.style.animationTimingFunction = 'ease-in';
                });
                setTimeout(function () {
                    _this.enableButtons();
                }, _this.spinTime);
            }, this.spinTime + this.spinDelay);
        };
        PosterRoom.prototype.updateSlotData = function (slot, data) {
            this.slots[slot].querySelectorAll('a.poster').forEach(function (el, i) {
                if (data[i].active) {
                    el.classList.remove('faded-out');
                }
                else {
                    el.classList.add('faded-out');
                }
            });
        };
        PosterRoom.prototype.getRandomPosterSlotData = function () {
            var poster1 = {
                id: 0,
                url: "scenes/" + this.getProperty("poster1").filename,
                active: true
            };
            var poster2 = {
                id: 1,
                url: "scenes/" + this.getProperty("poster2").filename,
                active: true
            };
            var poster3 = {
                id: 2,
                url: "scenes/" + this.getProperty("poster3").filename,
                active: true
            };
            var posters = [poster1, poster2, poster3];
            var data = [];
            for (var i = 0; i < 14; i++) {
                data.push(posters[Math.floor(Math.random() * posters.length)]);
                data[i].active = (Math.random() <= 0.5) ? true : false;
            }
            return data;
        };
        PosterRoom.prototype.buildSlot = function (slot, data) {
            var _this = this;
            if (data === void 0) { data = null; }
            this.slots[slot].innerHTML = "";
            var slotData = data || this.posterData[slot];
            this.posterData[slot] = slotData;
            slotData.forEach(function (data, i) {
                var pId = Date.now();
                var poster = document.createElement("a");
                poster.setAttribute('href', '#');
                poster.id = 'poster' + pId;
                poster.style.backgroundImage = "url(" + data.url + ")";
                var command = "posters";
                var param = data.id;
                poster.onclick = function () {
                    if (!poster.classList.contains('faded-out')) {
                        console.log("{\"command\":\"" + command + "\",\"param\":\"" + param + "\"}");
                        BABYLON.SceneManager.PostWindowMessage("{\"command\":\"" + command + "\",\"param\":\"" + param + "\"}", '*');
                    }
                };
                _this.slots[slot].appendChild(poster);
                poster.classList.add('poster');
                //poster.classList.add('poster', 'backwardAnim');
                if (!_this.posterData[slot][i].active) {
                    poster.classList.add('faded-out');
                }
                switch (slot) {
                    case 0:
                        poster.style.webkitAnimationName = 'orbit-next' + (i + 1);
                        poster.style.animationName = 'orbit-next' + (i + 1);
                        poster.style.webkitAnimationTimingFunction = 'ease-in';
                        poster.style.animationTimingFunction = 'ease-in';
                        break;
                    case 1:
                        _this.slots[1].classList.add('active');
                        poster.classList.add('forwardAnim');
                    case 2:
                        poster.style.webkitAnimationName = 'orbit-prev' + (i + 1);
                        poster.style.animationName = 'orbit-prev' + (i + 1);
                        poster.style.webkitAnimationTimingFunction = 'ease-in';
                        poster.style.animationTimingFunction = 'ease-in';
                        break;
                }
            });
        };
        PosterRoom.prototype.loadStylesheet = function () {
            var stylesheetFile = "scenes/" + this.getProperty("stylesheet").filename;
            var styles = document.createElement("link");
            styles.rel = "stylesheet";
            styles.type = "text/css";
            styles.href = stylesheetFile;
            document.getElementsByTagName('head')[0].appendChild(styles);
        };
        return PosterRoom;
    }(BABYLON.ScriptComponent));
    PROJECT.PosterRoom = PosterRoom;
})(PROJECT || (PROJECT = {}));
var BABYLON;
(function (BABYLON) {
    /**
     * Babylon animation state pro class (Unity Style Mechanim Animation System)
     * @class AnimationState - All rights reserved (c) 2020 Mackey Kinard
     */
    var AnimationState = /** @class */ (function (_super) {
        __extends(AnimationState, _super);
        function AnimationState() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._frametime = 0;
            _this._layercount = 0;
            _this._updatemode = 0;
            _this._hasrootmotion = false;
            _this._processmotion = true;
            _this._initialtargetblending = false;
            _this._hastransformhierarchy = false;
            _this._leftfeetbottomheight = 0;
            _this._rightfeetbottomheight = 0;
            _this._runtimecontroller = null;
            _this._executed = false;
            _this._checkers = new BABYLON.TransitionCheck();
            _this._source = "";
            _this._machine = null;
            _this._deltaPosition = new BABYLON.Vector3(0, 0, 0);
            _this._deltaRotation = new BABYLON.Quaternion(0, 0, 0, 1);
            _this._deltaAngleY = 0;
            _this._positionWeight = false;
            _this._rootBoneWeight = false;
            _this._rotationWeight = false;
            _this._rootQuatWeight = false;
            _this._positionHolder = new BABYLON.Vector3(0, 0, 0);
            _this._rootBoneHolder = new BABYLON.Vector3(0, 0, 0);
            _this._rotationHolder = new BABYLON.Quaternion(0, 0, 0, 1);
            _this._rootQuatHolder = new BABYLON.Quaternion(0, 0, 0, 1);
            _this._rootMotionMatrix = BABYLON.Matrix.Zero();
            _this._rootMotionScaling = new BABYLON.Vector3(0, 0, 0);
            _this._rootMotionRotation = new BABYLON.Quaternion(0, 0, 0, 1);
            _this._rootMotionPosition = new BABYLON.Vector3(0, 0, 0);
            _this._lastMotionRotation = new BABYLON.Quaternion(0, 0, 0, 1);
            _this._lastMotionPosition = new BABYLON.Vector3(0, 0, 0);
            _this._quatRotationDiff = new BABYLON.Quaternion(0, 0, 0, 1);
            _this._quatRotateVector = new BABYLON.Vector3(0, 0, 0);
            _this._dirtyMotionMatrix = null;
            _this._dirtyBlenderMatrix = null;
            //private _bodyOrientationAngleY:number = 0;
            _this._targetPosition = new BABYLON.Vector3(0, 0, 0);
            _this._targetRotation = new BABYLON.Quaternion(0, 0, 0, 1);
            _this._targetScaling = new BABYLON.Vector3(1, 1, 1);
            _this._updateMatrix = BABYLON.Matrix.Zero();
            _this._blenderMatrix = BABYLON.Matrix.Zero();
            _this._blendWeights = new BABYLON.BlendingWeights();
            _this._data = new Map();
            _this._anims = new Map();
            _this._numbers = new Map();
            _this._booleans = new Map();
            _this._triggers = new Map();
            _this._parameters = new Map();
            _this.speedRatio = 1.0;
            _this.applyRootMotion = false;
            _this.enableAnimation = true;
            _this.m_avatarMask = null;
            _this.m_defaultGroup = null;
            _this.m_animationTargets = null;
            /** Register handler that is triggered when the animation ik setup has been triggered */
            _this.onAnimationIKObservable = new BABYLON.Observable();
            /** Register handler that is triggered when the animation end has been triggered */
            _this.onAnimationEndObservable = new BABYLON.Observable();
            /** Register handler that is triggered when the animation loop has been triggered */
            _this.onAnimationLoopObservable = new BABYLON.Observable();
            /** Register handler that is triggered when the animation event has been triggered */
            _this.onAnimationEventObservable = new BABYLON.Observable();
            /** Register handler that is triggered when the animation frame has been updated */
            _this.onAnimationUpdateObservable = new BABYLON.Observable();
            return _this;
        }
        AnimationState.prototype.hasRootMotion = function () { return this._hasrootmotion; };
        AnimationState.prototype.getAnimationTime = function () { return this._frametime; };
        AnimationState.prototype.getDeltaPosition = function () { return this._deltaPosition; };
        AnimationState.prototype.getDeltaRotation = function () { return this._deltaRotation; };
        AnimationState.prototype.getRuntimeController = function () { return this._runtimecontroller; };
        AnimationState.prototype.awake = function () { this.awakeStateMachine(); };
        AnimationState.prototype.late = function () { this.lateStateMachine(); };
        AnimationState.prototype.destroy = function () { this.destroyStateMachine(); };
        /////////////////////////////////////////////////////////////////////////////////////
        // State Machine Functions
        /////////////////////////////////////////////////////////////////////////////////////
        AnimationState.prototype.playAnimation = function (state, transitionDuration, animationLayer, frameRate) {
            if (transitionDuration === void 0) { transitionDuration = 0; }
            if (animationLayer === void 0) { animationLayer = 0; }
            if (frameRate === void 0) { frameRate = null; }
            var result = false;
            if (this._machine.layers != null && this._machine.layers.length > animationLayer) {
                var layer = this._machine.layers[animationLayer];
                var blendFrameRate = (layer.animationStateMachine != null) ? (layer.animationStateMachine.rate || BABYLON.AnimationState.FPS) : BABYLON.AnimationState.FPS;
                var blendingSpeed = (transitionDuration > 0) ? BABYLON.Utilities.ComputeBlendingSpeed(frameRate || blendFrameRate, transitionDuration) : 0;
                this.setCurrentAnimationState(layer, state, blendingSpeed);
                result = true;
            }
            else {
                BABYLON.Tools.Warn("No animation state layers on " + this.transform.name);
            }
            return result;
        };
        /////////////////////////////////////////////////////////////////////////////////////
        // State Machine Functions
        /////////////////////////////////////////////////////////////////////////////////////
        AnimationState.prototype.getBool = function (name) {
            return this._booleans.get(name) || false;
        };
        AnimationState.prototype.setBool = function (name, value) {
            this._booleans.set(name, value);
        };
        AnimationState.prototype.getFloat = function (name) {
            return this._numbers.get(name) || 0;
        };
        AnimationState.prototype.setFloat = function (name, value) {
            this._numbers.set(name, value);
        };
        AnimationState.prototype.getInteger = function (name) {
            return this._numbers.get(name) || 0;
        };
        AnimationState.prototype.setInteger = function (name, value) {
            this._numbers.set(name, value);
        };
        AnimationState.prototype.getTrigger = function (name) {
            return this._triggers.get(name) || false;
        };
        AnimationState.prototype.setTrigger = function (name) {
            this._triggers.set(name, true);
        };
        AnimationState.prototype.resetTrigger = function (name) {
            this._triggers.set(name, false);
        };
        AnimationState.prototype.getMachineState = function (name) {
            return this._data.get(name);
        };
        AnimationState.prototype.setMachineState = function (name, value) {
            this._data.set(name, value);
        };
        AnimationState.prototype.getCurrentState = function (layer) {
            return (this._machine.layers != null && this._machine.layers.length > layer) ? this._machine.layers[layer].animationStateMachine : null;
        };
        AnimationState.prototype.getAnimationGroup = function (name) {
            return this._anims.get(name);
        };
        AnimationState.prototype.getAnimationGroups = function () {
            return this._anims;
        };
        AnimationState.prototype.setAnimationGroups = function (groups, remapTargets) {
            var _this = this;
            if (remapTargets === void 0) { remapTargets = false; }
            // ..
            // TODO - Handle Remap Animation Targets
            // ..
            if (groups != null && groups.length > 0) {
                this._anims = new Map();
                this.m_animationTargets = [];
                this.m_defaultGroup = groups[0];
                groups.forEach(function (group) {
                    var agroup = group;
                    try {
                        group.stop();
                    }
                    catch (_a) { }
                    if (group.targetedAnimations != null && group.targetedAnimations.length > 0) {
                        group.targetedAnimations.forEach(function (targetedAnimation) {
                            // Note: For Loop Faster Than IndexOf
                            var indexOfTarget = -1;
                            for (var i = 0; i < _this.m_animationTargets.length; i++) {
                                if (_this.m_animationTargets[i].target === targetedAnimation.target) {
                                    indexOfTarget = i;
                                    break;
                                }
                            }
                            if (indexOfTarget < 0) {
                                _this.m_animationTargets.push(targetedAnimation);
                                if (targetedAnimation.target.metadata == null)
                                    targetedAnimation.target.metadata = {};
                                if (targetedAnimation.target instanceof BABYLON.TransformNode) {
                                    BABYLON.Utilities.ValidateTransformQuaternion(targetedAnimation.target);
                                    var layerMixers = [];
                                    for (var index = 0; index < _this._layercount; index++) {
                                        var layerMixer = new BABYLON.AnimationMixer();
                                        layerMixer.positionBuffer = null;
                                        layerMixer.rotationBuffer = null;
                                        layerMixer.scalingBuffer = null;
                                        layerMixer.originalMatrix = null;
                                        layerMixer.blendingFactor = 0;
                                        layerMixer.blendingSpeed = 0;
                                        layerMixer.rootPosition = null;
                                        layerMixer.rootRotation = null;
                                        layerMixers.push(layerMixer);
                                    }
                                    targetedAnimation.target.metadata.mixer = layerMixers;
                                }
                                else if (targetedAnimation.target instanceof BABYLON.MorphTarget) {
                                    var morphLayerMixers = [];
                                    for (var index = 0; index < _this._layercount; index++) {
                                        var morphLayerMixer = new BABYLON.AnimationMixer();
                                        morphLayerMixer.influenceBuffer = null;
                                        morphLayerMixers.push(morphLayerMixer);
                                    }
                                    targetedAnimation.target.metadata.mixer = morphLayerMixers;
                                }
                            }
                        });
                    }
                    if (agroup != null && agroup.metadata != null && agroup.metadata.unity != null && agroup.metadata.unity.clip != null && agroup.metadata.unity.clip !== "") {
                        _this._anims.set(agroup.metadata.unity.clip, group);
                    }
                });
            }
        };
        AnimationState.prototype.getRootMotionAngle = function () {
            return this._deltaAngleY;
        };
        AnimationState.prototype.getRootMotionSpeed = function () {
            var length = this._deltaPosition.length();
            return (length >= BABYLON.AnimationState.MOTION) ? length : 0;
        };
        AnimationState.prototype.getForwardMoveSpeed = function (absolute) {
            if (absolute === void 0) { absolute = true; }
            return absolute ? Math.abs(this._deltaPosition.z) : this._deltaPosition.z;
        };
        /* Animation Controller State Machine Functions */
        AnimationState.prototype.awakeStateMachine = function () {
            var _this = this;
            this.m_animationTargets = [];
            this.m_defaultGroup = null;
            this.m_avatarMask = new Map();
            // ..
            this._machine = this.getProperty("machine", this._machine);
            this._updatemode = this.getProperty("updatemode", this._updatemode);
            this._hasrootmotion = this.getProperty("hasrootmotion", this._hasrootmotion);
            this._processmotion = this.getProperty("parserootmotion", this._processmotion);
            this._runtimecontroller = this.getProperty("runtimecontroller", this._runtimecontroller);
            this._hastransformhierarchy = this.getProperty("hastransformhierarchy", this._hastransformhierarchy);
            this._leftfeetbottomheight = this.getProperty("leftfeetbottomheight", this._leftfeetbottomheight);
            this._rightfeetbottomheight = this.getProperty("rightfeetbottomheight", this._rightfeetbottomheight);
            this.applyRootMotion = this.getProperty("applyrootmotion", this.applyRootMotion);
            this._source = (this.transform.metadata != null && this.transform.metadata.unity != null && this.transform.metadata.unity.animator != null && this.transform.metadata.unity.animator !== "") ? this.transform.metadata.unity.animator : null;
            // ..
            if (this._machine != null) {
                if (this._machine.speed != null) {
                    this.speedRatio = this._machine.speed;
                }
                if (this._machine.parameters != null && this._machine.parameters.length > 0) {
                    var plist = this._machine.parameters;
                    plist.forEach(function (parameter) {
                        var name = parameter.name;
                        var type = parameter.type;
                        var curve = parameter.curve;
                        var defaultFloat = parameter.defaultFloat;
                        var defaultBool = parameter.defaultBool;
                        var defaultInt = parameter.defaultInt;
                        _this._parameters.set(name, type);
                        if (type === BABYLON.AnimatorParameterType.Bool) {
                            _this.setBool(name, defaultBool);
                        }
                        else if (type === BABYLON.AnimatorParameterType.Float) {
                            _this.setFloat(name, defaultFloat);
                        }
                        else if (type === BABYLON.AnimatorParameterType.Int) {
                            _this.setInteger(name, defaultInt);
                        }
                        else if (type === BABYLON.AnimatorParameterType.Trigger) {
                            _this.resetTrigger(name);
                        }
                    });
                }
                // ..
                // Process Machine State Layers
                // ..
                if (this._machine.layers != null && this._machine.layers.length > 0) {
                    this._layercount = this._machine.layers.length;
                    // Sort In Ascending Order
                    this._machine.layers.sort(function (left, right) {
                        if (left.index < right.index)
                            return -1;
                        if (left.index > right.index)
                            return 1;
                        return 0;
                    });
                    // Parse Sstate Machine Layers
                    this._machine.layers.forEach(function (layer) {
                        // Set Layer Avatar Mask Transform Path
                        if (layer.avatarMask != null && layer.avatarMask.transformPaths != null && layer.avatarMask.transformPaths.length > 0) {
                            for (var i = 0; i < layer.avatarMask.transformPaths.length; i++) {
                                _this.m_avatarMask.set(layer.avatarMask.transformPaths[i], i);
                            }
                        }
                    });
                }
            }
            if (this._source != null && this._source !== "" && this.scene.animationGroups != null) {
                var sourceanims_1 = null;
                // ..
                // TODO - Optimize Searching Global Animation Groups - ???
                // ..
                this.scene.animationGroups.forEach(function (group) {
                    var agroup = group;
                    if (agroup != null && agroup.metadata != null && agroup.metadata.unity != null && agroup.metadata.unity.source != null && agroup.metadata.unity.source !== "") {
                        if (agroup.metadata.unity.source === _this._source) {
                            if (sourceanims_1 == null)
                                sourceanims_1 = [];
                            sourceanims_1.push(group);
                        }
                    }
                });
                if (sourceanims_1 != null && sourceanims_1.length > 0) {
                    this.setAnimationGroups(sourceanims_1);
                }
            }
            // ..
            // Map State Machine Tracks (Animation Groups)
            // ..
            if (this._machine != null && this._machine.states != null && this._machine.states.length > 0) {
                this._machine.states.forEach(function (state) {
                    if (state != null && state.name != null) {
                        _this.setupTreeBranches(state.blendtree);
                        _this.setMachineState(state.name, state);
                    }
                });
            }
            // DEBUG: Dump State Machine Debug Information
            // console.warn("*** Animation State Machine: " + this.transform.name);
            // console.log(this);
        };
        AnimationState.prototype.lateStateMachine = function (deltaTime) {
            var _this = this;
            if (deltaTime === void 0) { deltaTime = null; }
            if (this._executed === false) {
                this._executed = true;
                if (this._machine.layers != null && this._machine.layers.length > 0) {
                    this._machine.layers.forEach(function (layer) {
                        _this.setCurrentAnimationState(layer, layer.entry, 0);
                    });
                }
            }
            if (this.enableAnimation === true) {
                var frameDeltaTime = deltaTime || this.getDeltaSeconds();
                this.updateAnimationState(frameDeltaTime);
                this.updateAnimationCurves(frameDeltaTime);
                this.updateAnimationTargets(frameDeltaTime);
                if (this.onAnimationUpdateObservable.hasObservers() === true) {
                    this.onAnimationUpdateObservable.notifyObservers(this.transform);
                }
            }
        };
        AnimationState.prototype.destroyStateMachine = function () {
            this._data = null;
            this._anims = null;
            this._numbers = null;
            this._booleans = null;
            this._triggers = null;
            this._parameters = null;
            this._checkers = null;
            this._machine = null;
            this.onAnimationIKObservable.clear();
            this.onAnimationIKObservable = null;
            this.onAnimationEndObservable.clear();
            this.onAnimationEndObservable = null;
            this.onAnimationLoopObservable.clear();
            this.onAnimationLoopObservable = null;
            this.onAnimationEventObservable.clear();
            this.onAnimationEventObservable = null;
            this.onAnimationUpdateObservable.clear();
            this.onAnimationUpdateObservable = null;
        };
        /* Animation Controller Private Update Functions */
        AnimationState.prototype.updateAnimationState = function (deltaTime) {
            var _this = this;
            if (this._machine.layers != null && this._machine.layers.length > 0) {
                this._machine.layers.forEach(function (layer) {
                    _this.checkStateMachine(layer, deltaTime);
                });
            }
        };
        AnimationState.prototype.updateAnimationCurves = function (deltaTime) {
            // TODO - Update Custom Animation Curves (Animation Event Dispatcher)
        };
        AnimationState.prototype.updateAnimationTargets = function (deltaTime) {
            var _this = this;
            //this._bodyOrientationAngleY = 0;
            if (this.transform.rotationQuaternion != null) {
                //this._bodyOrientationAngleY = this.transform.rotationQuaternion.toEulerAngles().y; // TODO - OPTIMIZE THIS
            }
            else if (this.transform.rotation != null) {
                //this._bodyOrientationAngleY = this.transform.rotation.y;
            }
            if (this._machine.layers != null && this._machine.layers.length > 0) {
                this._machine.layers.forEach(function (layer) {
                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    if (layer.index === 0)
                        _this._frametime = layer.animationTime; // Note: Update Master Animation Frame Time
                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    if (layer.animationStateMachine != null && layer.animationStateMachine.blendtree != null) {
                        if (layer.iKPass === true && _this.onAnimationIKObservable.hasObservers() === true) {
                            _this.onAnimationIKObservable.notifyObservers(layer.index);
                        }
                        var layerState = layer.animationStateMachine;
                        if (layerState.type === BABYLON.MotionType.Clip && layerState.played !== -1)
                            layerState.played += deltaTime;
                        if (layerState.blendtree.children != null && layerState.blendtree.children.length > 0) {
                            var primaryBlendTree = layerState.blendtree.children[0];
                            if (primaryBlendTree != null) {
                                if (layerState.blendtree.blendType == BABYLON.BlendTreeType.Clip) {
                                    var animationTrack = primaryBlendTree.track;
                                    if (animationTrack != null) {
                                        var frameRatio = (BABYLON.AnimationState.TIME / animationTrack.to);
                                        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                        // Motion Clip Animation Timeline
                                        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                        layer.animationNormal = (layer.animationTime / BABYLON.AnimationState.TIME); // Note: Normalize Layer Frame Time
                                        var validateTime = (layer.animationNormal > 0.99) ? 1 : layer.animationNormal;
                                        var formattedTime_1 = Math.round(validateTime * 100) / 100;
                                        if (layerState.speed < 0)
                                            layer.animationNormal = (1 - layer.animationNormal); // Note: Reverse Normalized Frame Time
                                        var animationFrameTime_1 = (animationTrack.to * layer.animationNormal); // Note: Denormalize Animation Frame Time
                                        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                        // let additivereferenceposeclip:number = 0;
                                        // let additivereferenceposetime:number = 0.0;
                                        // let hasadditivereferencepose:boolean = false;
                                        // let starttime:number = 0.0;
                                        // let stoptime:number = 0.0;
                                        // let mirror:boolean = false;
                                        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                        var level_1 = 0.0;
                                        var looptime = false;
                                        var loopblend = false;
                                        var cycleoffset = 0.0;
                                        var heightfromfeet = false;
                                        var orientationoffsety_1 = 0.0;
                                        var keeporiginalorientation = false;
                                        var keeporiginalpositionxz = false;
                                        var keeporiginalpositiony = false;
                                        var loopblendorientation_1 = false;
                                        var loopblendpositiony_1 = false;
                                        var loopblendpositionxz_1 = false;
                                        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                        var agroup = animationTrack;
                                        if (agroup.metadata != null && agroup.metadata.unity != null) {
                                            if (agroup.metadata.unity.settings != null) {
                                                level_1 = (agroup.metadata.unity.settings.level != null) ? agroup.metadata.unity.settings.level : 0;
                                                looptime = (agroup.metadata.unity.settings.looptime != null) ? agroup.metadata.unity.settings.looptime : false;
                                                loopblend = (agroup.metadata.unity.settings.loopblend != null) ? agroup.metadata.unity.settings.loopblend : false;
                                                cycleoffset = (agroup.metadata.unity.settings.cycleoffset != null) ? agroup.metadata.unity.settings.cycleoffset : 0;
                                                heightfromfeet = (agroup.metadata.unity.settings.heightfromfeet != null) ? agroup.metadata.unity.settings.heightfromfeet : false;
                                                orientationoffsety_1 = (agroup.metadata.unity.settings.orientationoffsety != null) ? agroup.metadata.unity.settings.orientationoffsety : 0;
                                                keeporiginalorientation = (agroup.metadata.unity.settings.keeporiginalorientation != null) ? agroup.metadata.unity.settings.keeporiginalorientation : false;
                                                keeporiginalpositionxz = (agroup.metadata.unity.settings.keeporiginalpositionxz != null) ? agroup.metadata.unity.settings.keeporiginalpositionxz : false;
                                                keeporiginalpositiony = (agroup.metadata.unity.settings.keeporiginalpositiony != null) ? agroup.metadata.unity.settings.keeporiginalpositiony : false;
                                                loopblendorientation_1 = (agroup.metadata.unity.settings.loopblendorientation != null) ? agroup.metadata.unity.settings.loopblendorientation : false;
                                                loopblendpositiony_1 = (agroup.metadata.unity.settings.loopblendpositiony != null) ? agroup.metadata.unity.settings.loopblendpositiony : false;
                                                loopblendpositionxz_1 = (agroup.metadata.unity.settings.loopblendpositionxz != null) ? agroup.metadata.unity.settings.loopblendpositionxz : false;
                                            }
                                        }
                                        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                        // Unity Inverts Root Motion Animation Offsets
                                        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                        orientationoffsety_1 = BABYLON.Tools.ToRadians(orientationoffsety_1);
                                        orientationoffsety_1 *= -1;
                                        level_1 *= -1;
                                        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                        if (layer.animationTime >= BABYLON.AnimationState.TIME) {
                                            layer.animationFirstRun = false;
                                            layer.animationLoopFrame = true;
                                            if (looptime === true) {
                                                if (_this.onAnimationLoopObservable.hasObservers() === true) {
                                                    _this.onAnimationLoopObservable.notifyObservers(layer.index);
                                                }
                                            }
                                            else {
                                                if (layer.animationEndFrame === false) {
                                                    layer.animationEndFrame = true;
                                                    if (_this.onAnimationEndObservable.hasObservers() === true) {
                                                        _this.onAnimationEndObservable.notifyObservers(layer.index);
                                                    }
                                                }
                                            }
                                        }
                                        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                        if (layer.animationFirstRun === true || looptime === true) {
                                            animationTrack.targetedAnimations.forEach(function (targetedAnim) {
                                                if (targetedAnim.target instanceof BABYLON.TransformNode) {
                                                    var clipTarget = targetedAnim.target;
                                                    if (layer.index === 0 || layer.avatarMask == null || _this.filterTargetAvatarMask(layer, clipTarget)) {
                                                        var targetRootBone = (clipTarget.metadata != null && clipTarget.metadata.unity != null && clipTarget.metadata.unity.rootbone != null) ? clipTarget.metadata.unity.rootbone : false;
                                                        if (clipTarget.metadata != null && clipTarget.metadata.mixer != null) {
                                                            var clipTargetMixer = clipTarget.metadata.mixer[layer.index];
                                                            if (clipTargetMixer != null) {
                                                                if (targetedAnim.animation.targetProperty === "position") {
                                                                    _this._targetPosition = BABYLON.Utilities.SampleAnimationVector3(targetedAnim.animation, animationFrameTime_1);
                                                                    // ..
                                                                    // Handle Root Motion (Position)
                                                                    // ..
                                                                    if (targetRootBone === true) {
                                                                        _this._positionWeight = false;
                                                                        _this._positionHolder.set(0, 0, 0);
                                                                        _this._rootBoneWeight = false;
                                                                        _this._rootBoneHolder.set(0, 0, 0);
                                                                        // ..
                                                                        // Apply Root Motion
                                                                        // ..
                                                                        if (_this.applyRootMotion === true) {
                                                                            if (loopblendpositiony_1 === true && loopblendpositionxz_1 === true) {
                                                                                _this._positionWeight = true; // Bake XYZ Into Pose
                                                                                _this._positionHolder.set(_this._targetPosition.x, (_this._targetPosition.y + level_1), _this._targetPosition.z);
                                                                            }
                                                                            else if (loopblendpositiony_1 === false && loopblendpositionxz_1 === false) {
                                                                                _this._rootBoneWeight = true; // Use XYZ As Root Motion
                                                                                _this._rootBoneHolder.set(_this._targetPosition.x, (_this._targetPosition.y + level_1), _this._targetPosition.z);
                                                                            }
                                                                            else if (loopblendpositiony_1 === true && loopblendpositionxz_1 === false) {
                                                                                _this._positionWeight = true; // Bake Y Into Pose 
                                                                                _this._positionHolder.set(0, (_this._targetPosition.y + level_1), 0);
                                                                                _this._rootBoneWeight = true; // Use XZ As Root Motion
                                                                                _this._rootBoneHolder.set(_this._targetPosition.x, 0, _this._targetPosition.z);
                                                                            }
                                                                            else if (loopblendpositionxz_1 === true && loopblendpositiony_1 === false) {
                                                                                _this._positionWeight = true; // Bake XZ Into Pose
                                                                                _this._positionHolder.set(_this._targetPosition.x, 0, _this._targetPosition.z);
                                                                                _this._rootBoneWeight = true; // Use Y As Root Motion
                                                                                _this._rootBoneHolder.set(0, (_this._targetPosition.y + level_1), 0);
                                                                            }
                                                                        }
                                                                        else {
                                                                            if (_this._processmotion === true) {
                                                                                _this._positionWeight = true; // Bake Y Into Pose 
                                                                                _this._positionHolder.set(0, (_this._targetPosition.y + level_1), 0);
                                                                                _this._rootBoneWeight = true; // Zero XZ In-Place Motion
                                                                                _this._rootBoneHolder.set(0, 0, 0);
                                                                            }
                                                                            else {
                                                                                _this._positionWeight = true; // Bake XYZ Original Motion
                                                                                _this._positionHolder.set(_this._targetPosition.x, (_this._targetPosition.y + level_1), _this._targetPosition.z);
                                                                            }
                                                                        }
                                                                        // Bake Position Holder
                                                                        if (_this._positionWeight === true) {
                                                                            if (clipTargetMixer.positionBuffer == null)
                                                                                clipTargetMixer.positionBuffer = new BABYLON.Vector3(0, 0, 0);
                                                                            BABYLON.Utilities.BlendVector3Value(clipTargetMixer.positionBuffer, _this._positionHolder, 1.0);
                                                                        }
                                                                        // Bake Root Bone Holder
                                                                        if (_this._rootBoneWeight === true) {
                                                                            if (clipTargetMixer.rootPosition == null)
                                                                                clipTargetMixer.rootPosition = new BABYLON.Vector3(0, 0, 0);
                                                                            BABYLON.Utilities.BlendVector3Value(clipTargetMixer.rootPosition, _this._rootBoneHolder, 1.0);
                                                                        }
                                                                    }
                                                                    else {
                                                                        // Bake Normal Pose Position
                                                                        if (clipTargetMixer.positionBuffer == null)
                                                                            clipTargetMixer.positionBuffer = new BABYLON.Vector3(0, 0, 0);
                                                                        BABYLON.Utilities.BlendVector3Value(clipTargetMixer.positionBuffer, _this._targetPosition, 1.0);
                                                                    }
                                                                }
                                                                else if (targetedAnim.animation.targetProperty === "rotationQuaternion") {
                                                                    _this._targetRotation = BABYLON.Utilities.SampleAnimationQuaternion(targetedAnim.animation, animationFrameTime_1);
                                                                    // ..
                                                                    // Handle Root Motion (Rotation)
                                                                    // ..
                                                                    if (targetRootBone === true) {
                                                                        _this._rotationWeight = false;
                                                                        _this._rotationHolder.set(0, 0, 0, 0);
                                                                        _this._rootQuatWeight = false;
                                                                        _this._rootQuatHolder.set(0, 0, 0, 0);
                                                                        // TODO - OPTIMIZE TO EULER ANGLES
                                                                        var eulerAngle = _this._targetRotation.toEulerAngles();
                                                                        var orientationAngleY = eulerAngle.y; //(keeporiginalorientation === true) ? eulerAngle.y : this._bodyOrientationAngleY;
                                                                        // ..
                                                                        // Apply Root Motion
                                                                        // ..
                                                                        if (_this.applyRootMotion === true) {
                                                                            if (loopblendorientation_1 === true) {
                                                                                _this._rotationWeight = true; // Bake XYZ Into Pose
                                                                                BABYLON.Quaternion.FromEulerAnglesToRef(eulerAngle.x, (orientationAngleY + orientationoffsety_1), eulerAngle.z, _this._rotationHolder);
                                                                            }
                                                                            else {
                                                                                _this._rotationWeight = true; // Bake XZ Into Pose
                                                                                BABYLON.Quaternion.FromEulerAnglesToRef(eulerAngle.x, 0, eulerAngle.z, _this._rotationHolder);
                                                                                _this._rootQuatWeight = true; // Use Y As Root Motion
                                                                                BABYLON.Quaternion.FromEulerAnglesToRef(0, (orientationAngleY + orientationoffsety_1), 0, _this._rootQuatHolder);
                                                                            }
                                                                        }
                                                                        else {
                                                                            _this._rotationWeight = true; // Bake XYZ Into Pose
                                                                            BABYLON.Quaternion.FromEulerAnglesToRef(eulerAngle.x, (orientationAngleY + orientationoffsety_1), eulerAngle.z, _this._rotationHolder);
                                                                        }
                                                                        // Bake Rotation Holder
                                                                        if (_this._rotationWeight === true) {
                                                                            if (clipTargetMixer.rotationBuffer == null)
                                                                                clipTargetMixer.rotationBuffer = new BABYLON.Quaternion(0, 0, 0, 1);
                                                                            BABYLON.Utilities.BlendQuaternionValue(clipTargetMixer.rotationBuffer, _this._rotationHolder, 1.0);
                                                                        }
                                                                        // Bake Root Bone Rotation
                                                                        if (_this._rootQuatWeight === true) {
                                                                            if (clipTargetMixer.rootRotation == null)
                                                                                clipTargetMixer.rootRotation = new BABYLON.Quaternion(0, 0, 0, 1);
                                                                            BABYLON.Utilities.BlendQuaternionValue(clipTargetMixer.rootRotation, _this._rootQuatHolder, 1.0);
                                                                        }
                                                                    }
                                                                    else {
                                                                        // Bake Normal Pose Rotation
                                                                        if (clipTargetMixer.rotationBuffer == null)
                                                                            clipTargetMixer.rotationBuffer = new BABYLON.Quaternion(0, 0, 0, 1);
                                                                        BABYLON.Utilities.BlendQuaternionValue(clipTargetMixer.rotationBuffer, _this._targetRotation, 1.0);
                                                                    }
                                                                }
                                                                else if (targetedAnim.animation.targetProperty === "scaling") {
                                                                    _this._targetScaling = BABYLON.Utilities.SampleAnimationVector3(targetedAnim.animation, animationFrameTime_1);
                                                                    if (clipTargetMixer.scalingBuffer == null)
                                                                        clipTargetMixer.scalingBuffer = new BABYLON.Vector3(1, 1, 1);
                                                                    BABYLON.Utilities.BlendVector3Value(clipTargetMixer.scalingBuffer, _this._targetScaling, 1.0);
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                else if (targetedAnim.target instanceof BABYLON.MorphTarget) {
                                                    var morphTarget = targetedAnim.target;
                                                    if (morphTarget.metadata != null && morphTarget.metadata.mixer != null) {
                                                        var morphTargetMixer = morphTarget.metadata.mixer[layer.index];
                                                        if (targetedAnim.animation.targetProperty === "influence") {
                                                            var floatValue = BABYLON.Utilities.SampleAnimationFloat(targetedAnim.animation, animationFrameTime_1);
                                                            if (morphTargetMixer.influenceBuffer == null)
                                                                morphTargetMixer.influenceBuffer = 0;
                                                            morphTargetMixer.influenceBuffer = BABYLON.Utilities.BlendFloatValue(morphTargetMixer.influenceBuffer, floatValue, 1.0);
                                                        }
                                                    }
                                                }
                                            });
                                        }
                                        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                        // Validate Layer Animation Events (TODO - Pass Layer Index Properties To Observers)
                                        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                        if (layer.animationStateMachine.events != null && layer.animationStateMachine.events.length > 0) {
                                            layer.animationStateMachine.events.forEach(function (animatorEvent) {
                                                if (animatorEvent.time === formattedTime_1) {
                                                    // console.log("MOTION CLIP ANIM EVENT: " + animatorEvent.function + " -->  AT: " + formattedTime);
                                                    // TODO - Ensure Only Fired Off Once Per Loop
                                                    // FIXME - console.log("Motion Clip Animation Event: " + animatorEvent.time + " >> " + animatorEvent.clip + " >> " + animatorEvent.function);
                                                    if (_this.onAnimationEventObservable.hasObservers() === true) {
                                                        _this.onAnimationEventObservable.notifyObservers(animatorEvent);
                                                    }
                                                }
                                            });
                                        }
                                        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                        // Step Motion Clip Animation Time
                                        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                        if (layer.animationLoopFrame === true) {
                                            layer.animationTime = 0;
                                            layer.animationNormal = 0;
                                            layer.animationLoopFrame = false;
                                        }
                                        else {
                                            layer.animationTime += (deltaTime * frameRatio * Math.abs(layerState.speed) * Math.abs(_this.speedRatio));
                                            layer.animationTime = BABYLON.Scalar.Clamp(layer.animationTime, 0, BABYLON.AnimationState.TIME);
                                        }
                                    }
                                    else {
                                        // console.warn(">>> No Motion Clip Animation Track Found For: " + this.transform.name);
                                    }
                                }
                                else {
                                    // this._blendMessage = "";
                                    _this._blendWeights.primary = null;
                                    _this._blendWeights.secondary = null;
                                    var scaledWeightList = [];
                                    var primaryBlendTree_1 = layerState.blendtree;
                                    _this.parseTreeBranches(layer, primaryBlendTree_1, 1.0, scaledWeightList);
                                    var frameRatio = _this.computeWeightedFrameRatio(scaledWeightList);
                                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                    // Blend Tree Animation Timeline
                                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                    layer.animationNormal = (layer.animationTime / BABYLON.AnimationState.TIME); // Note: Normalize Layer Frame Time
                                    var validateTime = (layer.animationNormal > 0.99) ? 1 : layer.animationNormal;
                                    var formattedTime_2 = Math.round(validateTime * 100) / 100;
                                    if (layerState.speed < 0)
                                        layer.animationNormal = (1 - layer.animationNormal); // Note: Reverse Normalized Frame Time
                                    var blendingNormalTime = layer.animationNormal; // Note: Denormalize Animation Frame Time
                                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                    if (layer.animationTime >= BABYLON.AnimationState.TIME) {
                                        layer.animationLoopFrame = true; // Note: No Loop Or End Events For Blend Trees
                                    }
                                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                    var masterAnimationTrack = (scaledWeightList != null && scaledWeightList.length > 0 && scaledWeightList[0].track != null) ? scaledWeightList[0].track : null;
                                    if (masterAnimationTrack != null) {
                                        var targetCount = masterAnimationTrack.targetedAnimations.length;
                                        for (var targetIndex = 0; targetIndex < targetCount; targetIndex++) {
                                            var masterAnimimation = masterAnimationTrack.targetedAnimations[targetIndex];
                                            if (masterAnimimation.target instanceof BABYLON.TransformNode) {
                                                var blendTarget = masterAnimimation.target;
                                                if (layer.index === 0 || layer.avatarMask == null || _this.filterTargetAvatarMask(layer, blendTarget)) {
                                                    var targetRootBone = (blendTarget.metadata != null && blendTarget.metadata.unity != null && blendTarget.metadata.unity.rootbone != null) ? blendTarget.metadata.unity.rootbone : false;
                                                    if (blendTarget.metadata != null && blendTarget.metadata.mixer != null) {
                                                        _this._initialtargetblending = true; // Note: Reset First Target Blending Buffer
                                                        var blendTargetMixer = blendTarget.metadata.mixer[layer.index];
                                                        _this.updateBlendableTargets(deltaTime, layer, primaryBlendTree_1, masterAnimimation, targetIndex, blendTargetMixer, blendingNormalTime, targetRootBone);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        // console.warn(">>> No Blend Tree Master Animation Track Found For: " + this.transform.name);
                                    }
                                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                    // Validate Layer Animation Events (TODO - Pass Layer Index And Clip Blended Weight Properties To Observers)
                                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                    if (layer.animationStateMachine.events != null && layer.animationStateMachine.events.length > 0) {
                                        layer.animationStateMachine.events.forEach(function (animatorEvent) {
                                            if (animatorEvent.time === formattedTime_2) {
                                                // console.log("BLEND TREE ANIM EVENT: " + animatorEvent.function + " -->  AT: " + formattedTime);
                                                // TODO - Ensure Only Fired Off Once Per Loop
                                                // FIXME - console.log("Blend Tree Animation Event: " + animatorEvent.time + " >> " + animatorEvent.clip + " >> " + animatorEvent.function);
                                                if (_this.onAnimationEventObservable.hasObservers() === true) {
                                                    _this.onAnimationEventObservable.notifyObservers(animatorEvent);
                                                }
                                            }
                                        });
                                    }
                                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                    // Step Blend Tree Animation Time
                                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                    if (layer.animationLoopFrame === true) {
                                        layer.animationTime = 0;
                                        layer.animationNormal = 0;
                                        layer.animationLoopFrame = false;
                                    }
                                    else {
                                        layer.animationTime += (deltaTime * frameRatio * Math.abs(layerState.speed) * Math.abs(_this.speedRatio));
                                        layer.animationTime = BABYLON.Scalar.Clamp(layer.animationTime, 0, BABYLON.AnimationState.TIME);
                                    }
                                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                }
                            }
                        }
                    }
                });
            }
            this.finalizeAnimationTargets();
        };
        // private _blendMessage:string = "";
        AnimationState.prototype.updateBlendableTargets = function (deltaTime, layer, tree, masterAnimation, targetIndex, targetMixer, normalizedFrameTime, targetRootBone) {
            if (targetMixer != null && tree.children != null && tree.children.length > 0) {
                for (var index = 0; index < tree.children.length; index++) {
                    var child = tree.children[index];
                    if (child.weight > 0) {
                        if (child.type === BABYLON.MotionType.Clip) {
                            if (child.track != null) {
                                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                // let additivereferenceposeclip:number = 0;
                                // let additivereferenceposetime:number = 0.0;
                                // let hasadditivereferencepose:boolean = false;
                                // let starttime:number = 0.0;
                                // let stoptime:number = 0.0;
                                // let mirror:boolean = false;
                                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                // let looptime:boolean = true;
                                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                var level = 0.0;
                                var loopblend = false;
                                var cycleoffset = 0.0;
                                var heightfromfeet = false;
                                var orientationoffsety = 0.0;
                                var keeporiginalorientation = false;
                                var keeporiginalpositionxz = false;
                                var keeporiginalpositiony = false;
                                var loopblendorientation = false;
                                var loopblendpositiony = false;
                                var loopblendpositionxz = false;
                                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                var agroup = child.track;
                                if (agroup.metadata != null && agroup.metadata.unity != null) {
                                    if (agroup.metadata.unity.settings != null) {
                                        level = (agroup.metadata.unity.settings.level != null) ? agroup.metadata.unity.settings.level : 0;
                                        loopblend = (agroup.metadata.unity.settings.loopblend != null) ? agroup.metadata.unity.settings.loopblend : false;
                                        cycleoffset = (agroup.metadata.unity.settings.cycleoffset != null) ? agroup.metadata.unity.settings.cycleoffset : 0;
                                        heightfromfeet = (agroup.metadata.unity.settings.heightfromfeet != null) ? agroup.metadata.unity.settings.heightfromfeet : false;
                                        orientationoffsety = (agroup.metadata.unity.settings.orientationoffsety != null) ? agroup.metadata.unity.settings.orientationoffsety : 0;
                                        keeporiginalorientation = (agroup.metadata.unity.settings.keeporiginalorientation != null) ? agroup.metadata.unity.settings.keeporiginalorientation : false;
                                        keeporiginalpositionxz = (agroup.metadata.unity.settings.keeporiginalpositionxz != null) ? agroup.metadata.unity.settings.keeporiginalpositionxz : false;
                                        keeporiginalpositiony = (agroup.metadata.unity.settings.keeporiginalpositiony != null) ? agroup.metadata.unity.settings.keeporiginalpositiony : false;
                                        loopblendorientation = (agroup.metadata.unity.settings.loopblendorientation != null) ? agroup.metadata.unity.settings.loopblendorientation : false;
                                        loopblendpositiony = (agroup.metadata.unity.settings.loopblendpositiony != null) ? agroup.metadata.unity.settings.loopblendpositiony : false;
                                        loopblendpositionxz = (agroup.metadata.unity.settings.loopblendpositionxz != null) ? agroup.metadata.unity.settings.loopblendpositionxz : false;
                                    }
                                }
                                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                // Unity Inverts Root Motion Animation Offsets
                                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                orientationoffsety = BABYLON.Tools.ToRadians(orientationoffsety);
                                orientationoffsety *= -1;
                                level *= -1;
                                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                // this._blendMessage += (" >>> " + child.motion + ": " + child.weight.toFixed(2));
                                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                // TODO - Get blendable animation from target map - ???
                                var blendableAnim = child.track.targetedAnimations[targetIndex];
                                var blendableWeight = (this._initialtargetblending === true) ? 1.0 : parseFloat(child.weight.toFixed(2));
                                this._initialtargetblending = false; // Note: Clear First Target Blending Buffer
                                if (blendableAnim.target === masterAnimation.target && blendableAnim.animation.targetProperty === masterAnimation.animation.targetProperty) {
                                    var adjustedFrameTime = normalizedFrameTime; // Note: Adjust Normalized Frame Time
                                    if (child.timescale < 0)
                                        adjustedFrameTime = (1 - adjustedFrameTime); // Note: Reverse Normalized Frame Time
                                    var animationFrameTime = (child.track.to * adjustedFrameTime); // Note: Denormalize Animation Frame Time
                                    //const animationFrameTime:number = (Math.round((child.track.to * adjustedFrameTime) * 100) / 100);  // Note: Denormalize Animation Frame Time
                                    if (masterAnimation.animation.targetProperty === "position") {
                                        this._targetPosition = BABYLON.Utilities.SampleAnimationVector3(blendableAnim.animation, animationFrameTime);
                                        // ..
                                        // Root Transform Position
                                        // ..
                                        if (targetRootBone === true) {
                                            this._positionWeight = false;
                                            this._positionHolder.set(0, 0, 0);
                                            this._rootBoneWeight = false;
                                            this._rootBoneHolder.set(0, 0, 0);
                                            // ..
                                            // Apply Root Motion
                                            // ..
                                            if (this.applyRootMotion === true) {
                                                if (loopblendpositiony === true && loopblendpositionxz === true) {
                                                    this._positionWeight = true; // Bake XYZ Into Pose
                                                    this._positionHolder.set(this._targetPosition.x, (this._targetPosition.y + level), this._targetPosition.z);
                                                }
                                                else if (loopblendpositiony === false && loopblendpositionxz === false) {
                                                    this._rootBoneWeight = true; // Use XYZ As Root Motion
                                                    this._rootBoneHolder.set(this._targetPosition.x, (this._targetPosition.y + level), this._targetPosition.z);
                                                }
                                                else if (loopblendpositiony === true && loopblendpositionxz === false) {
                                                    this._positionWeight = true; // Bake Y Into Pose 
                                                    this._positionHolder.set(0, (this._targetPosition.y + level), 0);
                                                    this._rootBoneWeight = true; // Use XZ As Root Motion
                                                    this._rootBoneHolder.set(this._targetPosition.x, 0, this._targetPosition.z);
                                                }
                                                else if (loopblendpositionxz === true && loopblendpositiony === false) {
                                                    this._positionWeight = true; // Bake XZ Into Pose
                                                    this._positionHolder.set(this._targetPosition.x, 0, this._targetPosition.z);
                                                    this._rootBoneWeight = true; // Use Y As Root Motion
                                                    this._rootBoneHolder.set(0, (this._targetPosition.y + level), 0);
                                                }
                                            }
                                            else {
                                                if (this._processmotion === true) {
                                                    this._positionWeight = true; // Bake Y Into Pose 
                                                    this._positionHolder.set(0, (this._targetPosition.y + level), 0);
                                                    this._rootBoneWeight = true; // Zero XZ In-Place Motion
                                                    this._rootBoneHolder.set(0, 0, 0);
                                                }
                                                else {
                                                    this._positionWeight = true; // Bake XYZ Original Motion
                                                    this._positionHolder.set(this._targetPosition.x, (this._targetPosition.y + level), this._targetPosition.z);
                                                }
                                            }
                                            // Bake Position Holder
                                            if (this._positionWeight === true) {
                                                if (targetMixer.positionBuffer == null)
                                                    targetMixer.positionBuffer = new BABYLON.Vector3(0, 0, 0);
                                                BABYLON.Utilities.BlendVector3Value(targetMixer.positionBuffer, this._positionHolder, blendableWeight);
                                            }
                                            // Bake Root Bone Holder
                                            if (this._rootBoneWeight === true) {
                                                if (targetMixer.rootPosition == null)
                                                    targetMixer.rootPosition = new BABYLON.Vector3(0, 0, 0);
                                                BABYLON.Utilities.BlendVector3Value(targetMixer.rootPosition, this._rootBoneHolder, blendableWeight);
                                            }
                                        }
                                        else {
                                            // Bake Normal Pose Position
                                            if (targetMixer.positionBuffer == null)
                                                targetMixer.positionBuffer = new BABYLON.Vector3(0, 0, 0);
                                            BABYLON.Utilities.BlendVector3Value(targetMixer.positionBuffer, this._targetPosition, blendableWeight);
                                        }
                                    }
                                    else if (masterAnimation.animation.targetProperty === "rotationQuaternion") {
                                        this._targetRotation = BABYLON.Utilities.SampleAnimationQuaternion(blendableAnim.animation, animationFrameTime);
                                        // ..
                                        // Root Transform Rotation
                                        // ..
                                        if (targetRootBone === true) {
                                            this._rotationWeight = false;
                                            this._rotationHolder.set(0, 0, 0, 0);
                                            this._rootQuatWeight = false;
                                            this._rootQuatHolder.set(0, 0, 0, 0);
                                            var eulerAngle = this._targetRotation.toEulerAngles();
                                            var orientationAngleY = eulerAngle.y; //(keeporiginalorientation === true) ? eulerAngle.y : this._bodyOrientationAngleY;
                                            // ..
                                            // Apply Root Motion
                                            // ..
                                            if (this.applyRootMotion === true) {
                                                if (loopblendorientation === true) {
                                                    this._rotationWeight = true; // Bake XYZ Into Pose
                                                    BABYLON.Quaternion.FromEulerAnglesToRef(eulerAngle.x, (orientationAngleY + orientationoffsety), eulerAngle.z, this._rotationHolder);
                                                }
                                                else {
                                                    this._rotationWeight = true; // Bake XZ Into Pose
                                                    BABYLON.Quaternion.FromEulerAnglesToRef(eulerAngle.x, 0, eulerAngle.z, this._rotationHolder);
                                                    this._rootQuatWeight = true; // Use Y As Root Motion
                                                    BABYLON.Quaternion.FromEulerAnglesToRef(0, (orientationAngleY + orientationoffsety), 0, this._rootQuatHolder);
                                                }
                                            }
                                            else {
                                                this._rotationWeight = true; // Bake XYZ Into Pose
                                                BABYLON.Quaternion.FromEulerAnglesToRef(eulerAngle.x, (orientationAngleY + orientationoffsety), eulerAngle.z, this._rotationHolder);
                                            }
                                            // Bake Rotation Holder
                                            if (this._rotationWeight === true) {
                                                if (targetMixer.rotationBuffer == null)
                                                    targetMixer.rotationBuffer = new BABYLON.Quaternion(0, 0, 0, 1);
                                                BABYLON.Utilities.BlendQuaternionValue(targetMixer.rotationBuffer, this._rotationHolder, blendableWeight);
                                            }
                                            // Bake Root Bone Rotation
                                            if (this._rootQuatWeight === true) {
                                                if (targetMixer.rootRotation == null)
                                                    targetMixer.rootRotation = new BABYLON.Quaternion(0, 0, 0, 1);
                                                BABYLON.Utilities.BlendQuaternionValue(targetMixer.rootRotation, this._rootQuatHolder, blendableWeight);
                                            }
                                        }
                                        else {
                                            // Bake Normal Pose Rotation
                                            if (targetMixer.rotationBuffer == null)
                                                targetMixer.rotationBuffer = new BABYLON.Quaternion(0, 0, 0, 1);
                                            BABYLON.Utilities.BlendQuaternionValue(targetMixer.rotationBuffer, this._targetRotation, blendableWeight);
                                        }
                                    }
                                    else if (masterAnimation.animation.targetProperty === "scaling") {
                                        this._targetScaling = BABYLON.Utilities.SampleAnimationVector3(blendableAnim.animation, animationFrameTime);
                                        if (targetMixer.scalingBuffer == null)
                                            targetMixer.scalingBuffer = new BABYLON.Vector3(1, 1, 1);
                                        BABYLON.Utilities.BlendVector3Value(targetMixer.scalingBuffer, this._targetScaling, blendableWeight);
                                    }
                                }
                                else {
                                    BABYLON.Tools.Warn(tree.name + " - " + child.track.name + " blend tree mismatch (" + targetIndex + "): " + masterAnimation.target.name + " >>> " + blendableAnim.target.name);
                                }
                            }
                        }
                        else if (child.type === BABYLON.MotionType.Tree) {
                            this.updateBlendableTargets(deltaTime, layer, child.subtree, masterAnimation, targetIndex, targetMixer, normalizedFrameTime, targetRootBone);
                        }
                    }
                }
            }
            //if (targetIndex === 0) BABYLON.Utilities.PrintToScreen(this._blendMessage, "red");
        };
        AnimationState.prototype.finalizeAnimationTargets = function () {
            var _this = this;
            this._deltaAngleY = 0;
            this._deltaPosition.set(0, 0, 0);
            this._deltaRotation.set(0, 0, 0, 1);
            this._dirtyMotionMatrix = null;
            if (this.m_animationTargets != null && this.m_animationTargets.length > 0) {
                this.m_animationTargets.forEach(function (targetedAnim) {
                    var animationTarget = targetedAnim.target;
                    // ..
                    // Update Direct Transform Targets For Each Layer
                    // ..
                    if (animationTarget.metadata != null && animationTarget.metadata.mixer != null) {
                        if (_this._machine.layers != null && _this._machine.layers.length > 0) {
                            _this._blenderMatrix.reset();
                            _this._dirtyBlenderMatrix = null;
                            _this._machine.layers.forEach(function (layer) {
                                var animationTargetMixer = animationTarget.metadata.mixer[layer.index];
                                if (animationTargetMixer != null) {
                                    if (animationTarget instanceof BABYLON.TransformNode) {
                                        // ..
                                        // Update Dirty Transform Matrix
                                        // ..
                                        if (animationTargetMixer.positionBuffer != null || animationTargetMixer.rotationBuffer != null || animationTargetMixer.scalingBuffer != null) {
                                            BABYLON.Matrix.ComposeToRef((animationTargetMixer.scalingBuffer || animationTarget.scaling), (animationTargetMixer.rotationBuffer || animationTarget.rotationQuaternion), (animationTargetMixer.positionBuffer || animationTarget.position), _this._updateMatrix);
                                            if (animationTargetMixer.blendingSpeed > 0.0) {
                                                if (animationTargetMixer.blendingFactor <= 1.0 && animationTargetMixer.originalMatrix == null) {
                                                    animationTargetMixer.originalMatrix = BABYLON.Matrix.Compose((animationTarget.scaling), (animationTarget.rotationQuaternion), (animationTarget.position));
                                                }
                                                if (animationTargetMixer.blendingFactor <= 1.0 && animationTargetMixer.originalMatrix != null) {
                                                    BABYLON.Utilities.FastMatrixSlerp(animationTargetMixer.originalMatrix, _this._updateMatrix, animationTargetMixer.blendingFactor, _this._updateMatrix);
                                                    animationTargetMixer.blendingFactor += animationTargetMixer.blendingSpeed;
                                                }
                                            }
                                            BABYLON.Utilities.FastMatrixSlerp(_this._blenderMatrix, _this._updateMatrix, layer.defaultWeight, _this._blenderMatrix);
                                            _this._dirtyBlenderMatrix = true;
                                            animationTargetMixer.positionBuffer = null;
                                            animationTargetMixer.rotationBuffer = null;
                                            animationTargetMixer.scalingBuffer = null;
                                        }
                                        // ..
                                        // Update Dirty Root Motion Matrix
                                        // ..
                                        if (animationTargetMixer.rootPosition != null || animationTargetMixer.rootRotation != null) {
                                            BABYLON.Matrix.ComposeToRef((_this.transform.scaling), (animationTargetMixer.rootRotation || _this.transform.rotationQuaternion), (animationTargetMixer.rootPosition || _this.transform.position), _this._updateMatrix);
                                            // ..
                                            // TODO - May Need Seperate Blending Speed Properties
                                            // Note: Might Fix Large Root Motion Delta Issue - ???
                                            // ..
                                            /*
                                            if (animationTargetMixer.blendingSpeed > 0.0) {
                                                if (animationTargetMixer.blendingFactor <= 1.0 && animationTargetMixer.originalMatrix == null) {
                                                    animationTargetMixer.originalMatrix = BABYLON.Matrix.Compose(
                                                        (this.transform.scaling),
                                                        (this.transform.rotationQuaternion),
                                                        (this.transform.position)
                                                    );
                                                }
                                                if (animationTargetMixer.blendingFactor <= 1.0 && animationTargetMixer.originalMatrix != null) {
                                                    BABYLON.Utilities.FastMatrixSlerp(animationTargetMixer.originalMatrix, this._updateMatrix, animationTargetMixer.blendingFactor, this._updateMatrix);
                                                    animationTargetMixer.blendingFactor += animationTargetMixer.blendingSpeed;
                                                }
                                            }
                                            */
                                            BABYLON.Utilities.FastMatrixSlerp(_this._rootMotionMatrix, _this._updateMatrix, layer.defaultWeight, _this._rootMotionMatrix);
                                            _this._dirtyMotionMatrix = true;
                                            animationTargetMixer.rootPosition = null;
                                            animationTargetMixer.rootRotation = null;
                                        }
                                    }
                                    else if (animationTarget instanceof BABYLON.MorphTarget) {
                                        if (animationTargetMixer.influenceBuffer != null) {
                                            animationTarget.influence = BABYLON.Scalar.Lerp(animationTarget.influence, animationTargetMixer.influenceBuffer, layer.defaultWeight);
                                            animationTargetMixer.influenceBuffer = null;
                                        }
                                    }
                                }
                            });
                            if (_this._dirtyBlenderMatrix != null) {
                                _this._blenderMatrix.decompose(animationTarget.scaling, animationTarget.rotationQuaternion, animationTarget.position);
                            }
                        }
                    }
                });
            }
            // ..
            if (this._dirtyMotionMatrix != null) {
                this._rootMotionMatrix.decompose(this._rootMotionScaling, this._rootMotionRotation, this._rootMotionPosition);
                if (this._frametime === 0) {
                    this._lastMotionPosition.copyFrom(this._rootMotionPosition);
                    this._lastMotionRotation.copyFrom(this._rootMotionRotation);
                }
                if (this.applyRootMotion != null) {
                    // ..
                    // Update Current Delta Position
                    // ..
                    this._rootMotionPosition.subtractToRef(this._lastMotionPosition, this._deltaPosition);
                    // ..
                    // Update Current Delta Rotation
                    // ..
                    BABYLON.Utilities.QuaternionDiffToRef(this._lastMotionRotation, this._rootMotionRotation, this._quatRotationDiff);
                    this._quatRotationDiff.toEulerAnglesToRef(this._quatRotateVector);
                    this._deltaAngleY = this._quatRotateVector.y;
                    BABYLON.Quaternion.FromEulerAnglesToRef(0, this._deltaAngleY, 0, this._deltaRotation);
                    // ..
                    // Update Last Root Motion Deltas
                    // ..
                    this._lastMotionPosition.addInPlace(this._deltaPosition);
                    this._lastMotionRotation.multiplyInPlace(this._deltaRotation);
                }
            }
        };
        AnimationState.prototype.checkStateMachine = function (layer, deltaTime) {
            var _this = this;
            this._checkers.result = null;
            this._checkers.offest = 0;
            this._checkers.blending = 0;
            this._checkers.triggered = [];
            // ..
            // Check Animation State Transitions
            // ..
            if (layer.animationStateMachine != null) {
                // Check Local Transition Conditions
                this.checkStateTransitions(layer, layer.animationStateMachine.transitions, layer.animationStateMachine.time, layer.animationStateMachine.length, layer.animationStateMachine.rate);
                // Check Any State Transition Conditions
                if (this._checkers.result == null && this._machine.transitions != null) {
                    this.checkStateTransitions(layer, this._machine.transitions, layer.animationStateMachine.time, layer.animationStateMachine.length, layer.animationStateMachine.rate);
                }
            }
            // ..
            // Reset Transition Condition Triggers
            // ..
            if (this._checkers.triggered != null && this._checkers.triggered.length > 0) {
                this._checkers.triggered.forEach(function (trigger) { _this.resetTrigger(trigger); });
                this._checkers.triggered = null;
            }
            // ..
            // Set Current Machine State Result
            // ..
            if (this._checkers.result != null) {
                if (this._checkers.offest > 0)
                    BABYLON.SceneManager.SetTimeout((this._checkers.offest * 1000), function () { _this.setCurrentAnimationState(layer, _this._checkers.result, _this._checkers.blending); });
                else
                    this.setCurrentAnimationState(layer, this._checkers.result, this._checkers.blending);
            }
        };
        AnimationState.prototype.checkStateTransitions = function (layer, transitions, time, length, rate) {
            var _this = this;
            if (transitions != null && transitions.length > 0) {
                var i = 0;
                var ii = 0;
                var solo = -1;
                // ..
                // Check Has Solo Transitions
                // ..
                for (i = 0; i < transitions.length; i++) {
                    if (transitions[i].solo === true && transitions[i].mute === false) {
                        solo = i;
                        break;
                    }
                }
                var _loop_1 = function () {
                    var transition = transitions[i];
                    if (transition.layerIndex !== layer.index)
                        return "continue";
                    if (transition.mute === true)
                        return "continue";
                    if (solo >= 0 && solo !== i)
                        return "continue";
                    var transitionOk = false;
                    // ..
                    // Check Has Transition Exit Time
                    // ..
                    var exitTimeSecs = BABYLON.Scalar.Denormalize(transition.exitTime, 0, length);
                    var exitTimeExpired = ((BABYLON.SceneManager.GetGameTime() - time) >= exitTimeSecs);
                    if (transition.hasExitTime === true && transition.intSource == BABYLON.InterruptionSource.None && exitTimeExpired === false)
                        return "continue";
                    // ..
                    // Check All Transition Conditions
                    // ..
                    if (transition.conditions != null && transition.conditions.length > 0) {
                        var passed_1 = 0;
                        var checks = transition.conditions.length;
                        transition.conditions.forEach(function (condition) {
                            var ptype = _this._parameters.get(condition.parameter);
                            if (ptype != null) {
                                if (ptype == BABYLON.AnimatorParameterType.Float || ptype == BABYLON.AnimatorParameterType.Int) {
                                    var numValue = parseFloat(_this.getFloat(condition.parameter).toFixed(2));
                                    if (condition.mode === BABYLON.ConditionMode.Greater && numValue > condition.threshold) {
                                        passed_1++;
                                    }
                                    else if (condition.mode === BABYLON.ConditionMode.Less && numValue < condition.threshold) {
                                        passed_1++;
                                    }
                                    else if (condition.mode === BABYLON.ConditionMode.Equals && numValue === condition.threshold) {
                                        passed_1++;
                                    }
                                    else if (condition.mode === BABYLON.ConditionMode.NotEqual && numValue !== condition.threshold) {
                                        passed_1++;
                                    }
                                }
                                else if (ptype == BABYLON.AnimatorParameterType.Bool) {
                                    var boolValue = _this.getBool(condition.parameter);
                                    if (condition.mode === BABYLON.ConditionMode.If && boolValue === true) {
                                        passed_1++;
                                    }
                                    else if (condition.mode === BABYLON.ConditionMode.IfNot && boolValue === false) {
                                        passed_1++;
                                    }
                                }
                                else if (ptype == BABYLON.AnimatorParameterType.Trigger) {
                                    var triggerValue = _this.getTrigger(condition.parameter);
                                    if (triggerValue === true) {
                                        passed_1++;
                                        // Note: For Loop Faster Than IndexOf
                                        var indexOfTrigger = -1;
                                        for (var i_1 = 0; i_1 < _this._checkers.triggered.length; i_1++) {
                                            if (_this._checkers.triggered[i_1] === condition.parameter) {
                                                indexOfTrigger = i_1;
                                                break;
                                            }
                                        }
                                        if (indexOfTrigger < 0) {
                                            _this._checkers.triggered.push(condition.parameter);
                                        }
                                    }
                                }
                            }
                        });
                        if (transition.hasExitTime === true) {
                            // ..
                            // TODO - CHECK TRANSITION INTERUPTION SOURCE STATUS
                            // ..
                            // Validate Transition Has Exit Time And All Conditions Passed
                            transitionOk = (exitTimeExpired === true && passed_1 === checks);
                        }
                        else {
                            // Validate All Transition Conditions Passed
                            transitionOk = (passed_1 === checks);
                        }
                    }
                    else {
                        // Validate Transition Has Expired Exit Time Only
                        transitionOk = (transition.hasExitTime === true && exitTimeExpired === true);
                    }
                    // Validate Current Transition Destination Change
                    if (transitionOk === true) {
                        var blendSize = (length > 0) ? length : 1;
                        var blendRate = (rate > 0) ? rate : BABYLON.AnimationState.FPS;
                        var destState = (transition.isExit === false) ? transition.destination : BABYLON.AnimationState.EXIT;
                        var offsetSecs = (transition.fixedDuration === true) ? transition.offset : BABYLON.Scalar.Denormalize(transition.offset, 0, blendSize);
                        var durationSecs = (transition.fixedDuration === true) ? transition.duration : BABYLON.Scalar.Denormalize(transition.duration, 0, blendSize);
                        var blendingSpeed = BABYLON.Utilities.ComputeBlendingSpeed(blendRate, durationSecs);
                        this_1._checkers.result = destState;
                        this_1._checkers.offest = offsetSecs;
                        this_1._checkers.blending = blendingSpeed;
                        return "break";
                    }
                };
                var this_1 = this;
                // ..
                // Check State Machine Transitions
                // ..
                for (i = 0; i < transitions.length; i++) {
                    var state_1 = _loop_1();
                    if (state_1 === "break")
                        break;
                }
            }
        };
        AnimationState.prototype.setCurrentAnimationState = function (layer, name, blending) {
            if (name == null || name === "" || name === BABYLON.AnimationState.EXIT)
                return;
            if (layer.animationStateMachine != null && layer.animationStateMachine.name === name)
                return;
            var state = this.getMachineState(name);
            // ..
            // Reset Animation Target Mixers
            // ..
            if (this.m_animationTargets != null && this.m_animationTargets.length > 0) {
                this.m_animationTargets.forEach(function (targetedAnim) {
                    var animationTarget = targetedAnim.target;
                    if (animationTarget.metadata != null && animationTarget.metadata.mixer != null) {
                        var animationTargetMixer = animationTarget.metadata.mixer[layer.index];
                        if (animationTargetMixer != null) {
                            animationTargetMixer.originalMatrix = null;
                            animationTargetMixer.blendingFactor = 0;
                            animationTargetMixer.blendingSpeed = blending;
                        }
                    }
                });
            }
            // ..
            // Setup Current Layer Animation State
            // ..
            if (state != null && state.layerIndex === layer.index) {
                state.time = 0;
                state.played = 0;
                state.interrupted = false;
                layer.animationTime = 0;
                layer.animationNormal = 0;
                layer.animationFirstRun = true;
                layer.animationEndFrame = false;
                layer.animationLoopFrame = false;
                layer.animationStateMachine = state;
                layer.animationStateMachine.time = BABYLON.SceneManager.GetGameTime();
                //console.warn("Set Animation State: " + this.transform.name + " --> " + name);
            }
        };
        AnimationState.prototype.checkAvatarTransformPath = function (layer, transformPath) {
            var result = false;
            if (this.m_avatarMask != null) {
                var transformIndex = this.m_avatarMask.get(transformPath);
                if (transformIndex != null && transformIndex >= 0) {
                    result = true;
                }
            }
            return result;
        };
        AnimationState.prototype.filterTargetAvatarMask = function (layer, target) {
            var result = false;
            if (target.metadata != null && target.metadata.unity != null && target.metadata.unity.bone != null && target.metadata.unity.bone !== "") {
                var transformPath = target.metadata.unity.bone;
                result = this.checkAvatarTransformPath(layer, transformPath);
            }
            return result;
        };
        AnimationState.prototype.sortWeightedBlendingList = function (weightList) {
            if (weightList != null && weightList.length > 0) {
                // Sort In Descending Order
                weightList.sort(function (left, right) {
                    if (left.weight < right.weight)
                        return 1;
                    if (left.weight > right.weight)
                        return -1;
                    return 0;
                });
            }
        };
        AnimationState.prototype.computeWeightedFrameRatio = function (weightList) {
            var result = 1.0;
            if (weightList != null && weightList.length > 0) {
                this.sortWeightedBlendingList(weightList);
                this._blendWeights.primary = weightList[0];
                var primaryWeight = this._blendWeights.primary.weight;
                if (primaryWeight < 1.0 && weightList.length > 1) {
                    this._blendWeights.secondary = weightList[1];
                }
                // ..
                if (this._blendWeights.primary != null && this._blendWeights.secondary != null) {
                    var frameWeightDelta = BABYLON.Scalar.Clamp(this._blendWeights.primary.weight);
                    result = BABYLON.Scalar.Lerp(this._blendWeights.secondary.ratio, this._blendWeights.primary.ratio, frameWeightDelta);
                }
                else if (this._blendWeights.primary != null && this._blendWeights.secondary == null) {
                    result = this._blendWeights.primary.ratio;
                }
            }
            return result;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////
        // Blend Tree Branches -  Helper Functions
        ///////////////////////////////////////////////////////////////////////////////////////////////
        AnimationState.prototype.setupTreeBranches = function (tree) {
            var _this = this;
            if (tree != null && tree.children != null && tree.children.length > 0) {
                tree.children.forEach(function (child) {
                    if (child.type === BABYLON.MotionType.Tree) {
                        _this.setupTreeBranches(child.subtree);
                    }
                    else if (child.type === BABYLON.MotionType.Clip) {
                        if (child.motion != null && child.motion !== "") {
                            child.weight = 0;
                            child.ratio = 0;
                            child.track = _this.getAnimationGroup(child.motion);
                            if (child.track != null)
                                child.ratio = (BABYLON.AnimationState.TIME / child.track.to);
                        }
                    }
                });
            }
        };
        AnimationState.prototype.parseTreeBranches = function (layer, tree, parentWeight, weightList) {
            if (tree != null) {
                tree.valueParameterX = (tree.blendParameterX != null) ? parseFloat(this.getFloat(tree.blendParameterX).toFixed(2)) : 0;
                tree.valueParameterY = (tree.blendParameterY != null) ? parseFloat(this.getFloat(tree.blendParameterY).toFixed(2)) : 0;
                switch (tree.blendType) {
                    case BABYLON.BlendTreeType.Simple1D:
                        this.parse1DSimpleTreeBranches(layer, tree, parentWeight, weightList);
                        break;
                    case BABYLON.BlendTreeType.SimpleDirectional2D:
                        this.parse2DSimpleDirectionalTreeBranches(layer, tree, parentWeight, weightList);
                        break;
                    case BABYLON.BlendTreeType.FreeformDirectional2D:
                        this.parse2DFreeformDirectionalTreeBranches(layer, tree, parentWeight, weightList);
                        break;
                    case BABYLON.BlendTreeType.FreeformCartesian2D:
                        this.parse2DFreeformCartesianTreeBranches(layer, tree, parentWeight, weightList);
                        break;
                }
            }
        };
        AnimationState.prototype.parse1DSimpleTreeBranches = function (layer, tree, parentWeight, weightList) {
            var _this = this;
            if (tree != null && tree.children != null && tree.children.length > 0) {
                var blendTreeArray_1 = [];
                tree.children.forEach(function (child) {
                    child.weight = 0; // Note: Reset Weight Value
                    var item = {
                        source: child,
                        motion: child.motion,
                        posX: child.threshold,
                        posY: child.threshold,
                        weight: child.weight
                    };
                    blendTreeArray_1.push(item);
                });
                BABYLON.BlendTreeSystem.Calculate1DSimpleBlendTree(tree.valueParameterX, blendTreeArray_1);
                blendTreeArray_1.forEach(function (element) {
                    if (element.source != null) {
                        element.source.weight = element.weight;
                    }
                });
                tree.children.forEach(function (child) {
                    child.weight *= parentWeight; // Note: Scale Weight Value
                    if (child.type === BABYLON.MotionType.Clip) {
                        if (child.weight > 0) {
                            weightList.push(child);
                        }
                    }
                    if (child.type === BABYLON.MotionType.Tree) {
                        _this.parseTreeBranches(layer, child.subtree, child.weight, weightList);
                    }
                });
            }
        };
        AnimationState.prototype.parse2DSimpleDirectionalTreeBranches = function (layer, tree, parentWeight, weightList) {
            var _this = this;
            if (tree != null && tree.children != null && tree.children.length > 0) {
                var blendTreeArray_2 = [];
                tree.children.forEach(function (child) {
                    child.weight = 0; // Note: Reset Weight Value
                    var item = {
                        source: child,
                        motion: child.motion,
                        posX: child.positionX,
                        posY: child.positionY,
                        weight: child.weight
                    };
                    blendTreeArray_2.push(item);
                });
                BABYLON.BlendTreeSystem.Calculate2DFreeformDirectional(tree.valueParameterX, tree.valueParameterY, blendTreeArray_2);
                blendTreeArray_2.forEach(function (element) {
                    if (element.source != null) {
                        element.source.weight = element.weight;
                    }
                });
                tree.children.forEach(function (child) {
                    child.weight *= parentWeight; // Note: Scale Weight Value
                    if (child.type === BABYLON.MotionType.Clip) {
                        if (child.weight > 0) {
                            weightList.push(child);
                        }
                    }
                    if (child.type === BABYLON.MotionType.Tree) {
                        _this.parseTreeBranches(layer, child.subtree, child.weight, weightList);
                    }
                });
            }
        };
        AnimationState.prototype.parse2DFreeformDirectionalTreeBranches = function (layer, tree, parentWeight, weightList) {
            var _this = this;
            if (tree != null && tree.children != null && tree.children.length > 0) {
                var blendTreeArray_3 = [];
                tree.children.forEach(function (child) {
                    child.weight = 0; // Note: Reset Weight Value
                    var item = {
                        source: child,
                        motion: child.motion,
                        posX: child.positionX,
                        posY: child.positionY,
                        weight: child.weight
                    };
                    blendTreeArray_3.push(item);
                });
                BABYLON.BlendTreeSystem.Calculate2DFreeformDirectional(tree.valueParameterX, tree.valueParameterY, blendTreeArray_3);
                blendTreeArray_3.forEach(function (element) {
                    if (element.source != null) {
                        element.source.weight = element.weight;
                    }
                });
                tree.children.forEach(function (child) {
                    child.weight *= parentWeight; // Note: Scale Weight Value
                    if (child.type === BABYLON.MotionType.Clip) {
                        if (child.weight > 0) {
                            weightList.push(child);
                        }
                    }
                    if (child.type === BABYLON.MotionType.Tree) {
                        _this.parseTreeBranches(layer, child.subtree, child.weight, weightList);
                    }
                });
            }
        };
        AnimationState.prototype.parse2DFreeformCartesianTreeBranches = function (layer, tree, parentWeight, weightList) {
            var _this = this;
            if (tree != null && tree.children != null && tree.children.length > 0) {
                var blendTreeArray_4 = [];
                tree.children.forEach(function (child) {
                    child.weight = 0; // Note: Reset Weight Value
                    var item = {
                        source: child,
                        motion: child.motion,
                        posX: child.positionX,
                        posY: child.positionY,
                        weight: child.weight
                    };
                    blendTreeArray_4.push(item);
                });
                BABYLON.BlendTreeSystem.Calculate2DFreeformCartesian(tree.valueParameterX, tree.valueParameterY, blendTreeArray_4);
                blendTreeArray_4.forEach(function (element) {
                    if (element.source != null) {
                        element.source.weight = element.weight;
                    }
                });
                tree.children.forEach(function (child) {
                    child.weight *= parentWeight; // Note: Scale Weight Value
                    if (child.type === BABYLON.MotionType.Clip) {
                        if (child.weight > 0) {
                            weightList.push(child);
                        }
                    }
                    if (child.type === BABYLON.MotionType.Tree) {
                        _this.parseTreeBranches(layer, child.subtree, child.weight, weightList);
                    }
                });
            }
        };
        AnimationState.FPS = 30;
        AnimationState.TIME = 1;
        AnimationState.EXIT = "[EXIT]";
        AnimationState.MOTION = 0.001;
        return AnimationState;
    }(BABYLON.ScriptComponent));
    BABYLON.AnimationState = AnimationState;
    ///////////////////////////////////////////
    // Support Classes, Blend Tree Utilities
    ///////////////////////////////////////////
    var BlendTreeValue = /** @class */ (function () {
        function BlendTreeValue(config) {
            this.source = config.source;
            this.motion = config.motion;
            this.posX = config.posX || 0;
            this.posY = config.posY || 0;
            this.weight = config.weight || 0;
        }
        return BlendTreeValue;
    }());
    BABYLON.BlendTreeValue = BlendTreeValue;
    var BlendTreeUtils = /** @class */ (function () {
        function BlendTreeUtils() {
        }
        BlendTreeUtils.ClampValue = function (num, min, max) {
            return num <= min ? min : num >= max ? max : num;
        };
        BlendTreeUtils.GetSignedAngle = function (a, b) {
            return Math.atan2(a.x * b.y - a.y * b.x, a.x * b.x + a.y * b.y);
        };
        BlendTreeUtils.GetLinearInterpolation = function (x0, y0, x1, y1, x) {
            return y0 + (x - x0) * ((y1 - y0) / (x1 - x0));
        };
        BlendTreeUtils.GetRightNeighbourIndex = function (inputX, blendTreeArray) {
            blendTreeArray.sort(function (a, b) { return (a.posX - b.posX); });
            for (var i = 0; i < blendTreeArray.length; ++i) {
                if (blendTreeArray[i].posX > inputX) {
                    return i;
                }
            }
            return -1;
        };
        return BlendTreeUtils;
    }());
    BABYLON.BlendTreeUtils = BlendTreeUtils;
    var BlendTreeSystem = /** @class */ (function () {
        function BlendTreeSystem() {
        }
        BlendTreeSystem.Calculate1DSimpleBlendTree = function (inputX, blendTreeArray) {
            var firstBlendTree = blendTreeArray[0];
            var lastBlendTree = blendTreeArray[blendTreeArray.length - 1];
            if (inputX <= firstBlendTree.posX) {
                firstBlendTree.weight = 1;
            }
            else if (inputX >= lastBlendTree.posX) {
                lastBlendTree.weight = 1;
            }
            else {
                var rightNeighbourBlendTreeIndex = BABYLON.BlendTreeUtils.GetRightNeighbourIndex(inputX, blendTreeArray);
                var leftNeighbour = blendTreeArray[rightNeighbourBlendTreeIndex - 1];
                var rightNeighbour = blendTreeArray[rightNeighbourBlendTreeIndex];
                var interpolatedValue = BABYLON.BlendTreeUtils.GetLinearInterpolation(leftNeighbour.posX, 1, rightNeighbour.posX, 0, inputX);
                leftNeighbour.weight = interpolatedValue;
                rightNeighbour.weight = 1 - leftNeighbour.weight;
            }
        };
        BlendTreeSystem.Calculate2DFreeformDirectional = function (inputX, inputY, blendTreeArray) {
            BABYLON.BlendTreeSystem.TempVector2_IP.set(inputX, inputY);
            BABYLON.BlendTreeSystem.TempVector2_POSI.set(0, 0);
            BABYLON.BlendTreeSystem.TempVector2_POSJ.set(0, 0);
            BABYLON.BlendTreeSystem.TempVector2_POSIP.set(0, 0);
            BABYLON.BlendTreeSystem.TempVector2_POSIJ.set(0, 0);
            var kDirScale = 2;
            var totalWeight = 0;
            var inputLength = BABYLON.BlendTreeSystem.TempVector2_IP.length();
            for (var i = 0; i < blendTreeArray.length; ++i) {
                var blendTree = blendTreeArray[i];
                BABYLON.BlendTreeSystem.TempVector2_POSI.set(blendTree.posX, blendTree.posY);
                var posILength = BABYLON.BlendTreeSystem.TempVector2_POSI.length();
                var inputToPosILength = (inputLength - posILength);
                var posIToInputAngle = BABYLON.BlendTreeUtils.GetSignedAngle(BABYLON.BlendTreeSystem.TempVector2_POSI, BABYLON.BlendTreeSystem.TempVector2_IP);
                var weight = 1;
                for (var j = 0; j < blendTreeArray.length; ++j) {
                    if (j === i) {
                        continue;
                    }
                    else {
                        BABYLON.BlendTreeSystem.TempVector2_POSJ.set(blendTreeArray[j].posX, blendTreeArray[j].posY);
                        var posJLength = BABYLON.BlendTreeSystem.TempVector2_POSJ.length();
                        var averageLengthOfIJ = (posILength + posJLength) / 2;
                        var magOfPosIToInputPos = (inputToPosILength / averageLengthOfIJ);
                        var magOfIJ = (posJLength - posILength) / averageLengthOfIJ;
                        var angleIJ = BABYLON.BlendTreeUtils.GetSignedAngle(BABYLON.BlendTreeSystem.TempVector2_POSI, BABYLON.BlendTreeSystem.TempVector2_POSJ);
                        BABYLON.BlendTreeSystem.TempVector2_POSIP.set(magOfPosIToInputPos, posIToInputAngle * kDirScale);
                        BABYLON.BlendTreeSystem.TempVector2_POSIJ.set(magOfIJ, angleIJ * kDirScale);
                        var lenSqIJ = BABYLON.BlendTreeSystem.TempVector2_POSIJ.lengthSquared();
                        var newWeight = BABYLON.Vector2.Dot(BABYLON.BlendTreeSystem.TempVector2_POSIP, BABYLON.BlendTreeSystem.TempVector2_POSIJ) / lenSqIJ;
                        newWeight = 1 - newWeight;
                        newWeight = BABYLON.BlendTreeUtils.ClampValue(newWeight, 0, 1);
                        weight = Math.min(newWeight, weight);
                    }
                }
                blendTree.weight = weight;
                totalWeight += weight;
            }
            for (var _i = 0, blendTreeArray_5 = blendTreeArray; _i < blendTreeArray_5.length; _i++) {
                var blendTree = blendTreeArray_5[_i];
                blendTree.weight /= totalWeight;
            }
        };
        BlendTreeSystem.Calculate2DFreeformCartesian = function (inputX, inputY, blendTreeArray) {
            BABYLON.BlendTreeSystem.TempVector2_IP.set(inputX, inputY);
            BABYLON.BlendTreeSystem.TempVector2_POSI.set(0, 0);
            BABYLON.BlendTreeSystem.TempVector2_POSJ.set(0, 0);
            BABYLON.BlendTreeSystem.TempVector2_POSIP.set(0, 0);
            BABYLON.BlendTreeSystem.TempVector2_POSIJ.set(0, 0);
            var totalWeight = 0;
            for (var i = 0; i < blendTreeArray.length; ++i) {
                var blendTree = blendTreeArray[i];
                BABYLON.BlendTreeSystem.TempVector2_POSI.set(blendTree.posX, blendTree.posY);
                BABYLON.BlendTreeSystem.TempVector2_IP.subtractToRef(BABYLON.BlendTreeSystem.TempVector2_POSI, BABYLON.BlendTreeSystem.TempVector2_POSIP);
                var weight = 1;
                for (var j = 0; j < blendTreeArray.length; ++j) {
                    if (j === i) {
                        continue;
                    }
                    else {
                        BABYLON.BlendTreeSystem.TempVector2_POSJ.set(blendTreeArray[j].posX, blendTreeArray[j].posY);
                        BABYLON.BlendTreeSystem.TempVector2_POSJ.subtractToRef(BABYLON.BlendTreeSystem.TempVector2_POSI, BABYLON.BlendTreeSystem.TempVector2_POSIJ);
                        var lenSqIJ = BABYLON.BlendTreeSystem.TempVector2_POSIJ.lengthSquared();
                        var newWeight = BABYLON.Vector2.Dot(BABYLON.BlendTreeSystem.TempVector2_POSIP, BABYLON.BlendTreeSystem.TempVector2_POSIJ) / lenSqIJ;
                        newWeight = 1 - newWeight;
                        newWeight = BABYLON.BlendTreeUtils.ClampValue(newWeight, 0, 1);
                        weight = Math.min(weight, newWeight);
                    }
                }
                blendTree.weight = weight;
                totalWeight += weight;
            }
            for (var _i = 0, blendTreeArray_6 = blendTreeArray; _i < blendTreeArray_6.length; _i++) {
                var blendTree = blendTreeArray_6[_i];
                blendTree.weight /= totalWeight;
            }
        };
        BlendTreeSystem.TempVector2_IP = new BABYLON.Vector2(0, 0);
        BlendTreeSystem.TempVector2_POSI = new BABYLON.Vector2(0, 0);
        BlendTreeSystem.TempVector2_POSJ = new BABYLON.Vector2(0, 0);
        BlendTreeSystem.TempVector2_POSIP = new BABYLON.Vector2(0, 0);
        BlendTreeSystem.TempVector2_POSIJ = new BABYLON.Vector2(0, 0);
        return BlendTreeSystem;
    }());
    BABYLON.BlendTreeSystem = BlendTreeSystem;
    ///////////////////////////////////////////
    // Support Classes, Enums And Interfaces
    ///////////////////////////////////////////
    var MachineState = /** @class */ (function () {
        function MachineState() {
        }
        return MachineState;
    }());
    BABYLON.MachineState = MachineState;
    var TransitionCheck = /** @class */ (function () {
        function TransitionCheck() {
        }
        return TransitionCheck;
    }());
    BABYLON.TransitionCheck = TransitionCheck;
    var AnimationMixer = /** @class */ (function () {
        function AnimationMixer() {
        }
        return AnimationMixer;
    }());
    BABYLON.AnimationMixer = AnimationMixer;
    var BlendingWeights = /** @class */ (function () {
        function BlendingWeights() {
        }
        return BlendingWeights;
    }());
    BABYLON.BlendingWeights = BlendingWeights;
    var MotionType;
    (function (MotionType) {
        MotionType[MotionType["Clip"] = 0] = "Clip";
        MotionType[MotionType["Tree"] = 1] = "Tree";
    })(MotionType = BABYLON.MotionType || (BABYLON.MotionType = {}));
    var ConditionMode;
    (function (ConditionMode) {
        ConditionMode[ConditionMode["If"] = 1] = "If";
        ConditionMode[ConditionMode["IfNot"] = 2] = "IfNot";
        ConditionMode[ConditionMode["Greater"] = 3] = "Greater";
        ConditionMode[ConditionMode["Less"] = 4] = "Less";
        ConditionMode[ConditionMode["Equals"] = 6] = "Equals";
        ConditionMode[ConditionMode["NotEqual"] = 7] = "NotEqual";
    })(ConditionMode = BABYLON.ConditionMode || (BABYLON.ConditionMode = {}));
    var InterruptionSource;
    (function (InterruptionSource) {
        InterruptionSource[InterruptionSource["None"] = 0] = "None";
        InterruptionSource[InterruptionSource["Source"] = 1] = "Source";
        InterruptionSource[InterruptionSource["Destination"] = 2] = "Destination";
        InterruptionSource[InterruptionSource["SourceThenDestination"] = 3] = "SourceThenDestination";
        InterruptionSource[InterruptionSource["DestinationThenSource"] = 4] = "DestinationThenSource";
    })(InterruptionSource = BABYLON.InterruptionSource || (BABYLON.InterruptionSource = {}));
    var BlendTreeType;
    (function (BlendTreeType) {
        BlendTreeType[BlendTreeType["Simple1D"] = 0] = "Simple1D";
        BlendTreeType[BlendTreeType["SimpleDirectional2D"] = 1] = "SimpleDirectional2D";
        BlendTreeType[BlendTreeType["FreeformDirectional2D"] = 2] = "FreeformDirectional2D";
        BlendTreeType[BlendTreeType["FreeformCartesian2D"] = 3] = "FreeformCartesian2D";
        BlendTreeType[BlendTreeType["Direct"] = 4] = "Direct";
        BlendTreeType[BlendTreeType["Clip"] = 5] = "Clip";
    })(BlendTreeType = BABYLON.BlendTreeType || (BABYLON.BlendTreeType = {}));
    var BlendTreePosition;
    (function (BlendTreePosition) {
        BlendTreePosition[BlendTreePosition["Lower"] = 0] = "Lower";
        BlendTreePosition[BlendTreePosition["Upper"] = 1] = "Upper";
    })(BlendTreePosition = BABYLON.BlendTreePosition || (BABYLON.BlendTreePosition = {}));
    var AnimatorParameterType;
    (function (AnimatorParameterType) {
        AnimatorParameterType[AnimatorParameterType["Float"] = 1] = "Float";
        AnimatorParameterType[AnimatorParameterType["Int"] = 3] = "Int";
        AnimatorParameterType[AnimatorParameterType["Bool"] = 4] = "Bool";
        AnimatorParameterType[AnimatorParameterType["Trigger"] = 9] = "Trigger";
    })(AnimatorParameterType = BABYLON.AnimatorParameterType || (BABYLON.AnimatorParameterType = {}));
})(BABYLON || (BABYLON = {}));
var BABYLON;
(function (BABYLON) {
    /**
     * Babylon audio source manager pro class
     * @class AudioSource - All rights reserved (c) 2020 Mackey Kinard
     */
    var AudioSource = /** @class */ (function (_super) {
        __extends(AudioSource, _super);
        function AudioSource() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._audio = null;
            _this._name = null;
            _this._file = null;
            _this._loop = false;
            _this._mute = false;
            _this._volume = 1;
            _this._pitch = 1;
            _this._priority = 128;
            _this._panstereo = 0;
            _this._mindistance = 1;
            _this._maxdistance = 50;
            _this._rolloffmode = "linear";
            _this._rollofffactor = 1;
            _this._playonawake = true;
            _this._spatialblend = 0;
            _this._reverbzonemix = 1;
            _this._lastmutedvolume = null;
            _this._bypasseffects = false;
            _this._bypassreverbzones = false;
            _this._bypasslistenereffects = false;
            _this._initializedReadyInstance = false;
            /** Register handler that is triggered when the audio clip is ready */
            _this.onReadyObservable = new BABYLON.Observable();
            return _this;
        }
        AudioSource.prototype.getSoundClip = function () { return this._audio; };
        AudioSource.prototype.getAudioElement = function () { return (this._audio != null) ? this._audio._htmlAudioElement : null; };
        AudioSource.prototype.awake = function () { this.awakeAudioSource(); };
        AudioSource.prototype.destroy = function () { this.destroyAudioSource(); };
        AudioSource.prototype.awakeAudioSource = function () {
            var _this = this;
            this._name = this.getProperty("name", this._name);
            this._file = this.getProperty("file", this._file);
            this._loop = this.getProperty("loop", this._loop);
            this._mute = this.getProperty("mute", this._mute);
            this._volume = this.getProperty("volume", this._volume);
            this._pitch = this.getProperty("pitch", this._pitch);
            this._priority = this.getProperty("priority", this._priority);
            this._panstereo = this.getProperty("panstereo", this._panstereo);
            this._playonawake = this.getProperty("playonawake", this._playonawake);
            this._mindistance = this.getProperty("mindistance", this._mindistance);
            this._maxdistance = this.getProperty("maxdistance", this._maxdistance);
            this._rolloffmode = this.getProperty("rolloffmode", this._rolloffmode);
            this._rollofffactor = this.getProperty("rollofffactor", this._rollofffactor);
            this._spatialblend = this.getProperty("spatialblend", this._spatialblend);
            this._reverbzonemix = this.getProperty("reverbzonemix", this._reverbzonemix);
            this._bypasseffects = this.getProperty("bypasseffects", this._bypasseffects);
            this._bypassreverbzones = this.getProperty("bypassreverbzones", this._bypassreverbzones);
            this._bypasslistenereffects = this.getProperty("bypasslistenereffects", this._bypasslistenereffects);
            // ..
            var htmlAudioElementRequired = (this.transform.metadata != null && this.transform.metadata.vtt != null && this.transform.metadata.vtt === true);
            if (this._name == null || this._name === "")
                this._name = "Unknown";
            if (this._file != null && this._file !== "") {
                var rootUrl = BABYLON.SceneManager.GetRootUrl(this.scene);
                var spatialBlend = (this._spatialblend >= 0.1);
                var distanceModel = (this._rolloffmode === "logarithmic") ? "exponential" : "linear";
                // ..
                // TODO - Use Custom Loader For Progress - ???
                // ..
                this._audio = new BABYLON.Sound(this._name, (rootUrl + this._file), this.scene, function () {
                    if (_this._mute === true) {
                        _this._lastmutedvolume = _this._volume;
                        _this._audio.setVolume(0);
                    }
                    else {
                        _this._audio.setVolume(_this._volume);
                    }
                    _this._audio.setVolume((_this._mute === true) ? 0 : _this._volume);
                    _this._audio.setPlaybackRate(_this._pitch);
                    _this._initializedReadyInstance = true;
                    if (_this.onReadyObservable.hasObservers() === true) {
                        _this.onReadyObservable.notifyObservers(_this._audio);
                    }
                }, {
                    loop: this._loop,
                    autoplay: this._playonawake,
                    refDistance: this._mindistance,
                    maxDistance: this._maxdistance,
                    rolloffFactor: this._rollofffactor,
                    spatialSound: spatialBlend,
                    distanceModel: distanceModel,
                    streaming: htmlAudioElementRequired
                });
                this._audio.setPosition(this.transform.position.clone());
                if (spatialBlend === true)
                    this._audio.attachToMesh(this.transform);
            }
        };
        AudioSource.prototype.destroyAudioSource = function () {
            this.onReadyObservable.clear();
            this.onReadyObservable = null;
            if (this._audio != null) {
                this._audio.dispose();
                this._audio = null;
            }
        };
        /**
         * Gets the ready status for track
         */
        AudioSource.prototype.isReady = function () {
            var result = false;
            if (this._audio != null) {
                result = this._audio.isReady();
            }
            return result;
        };
        /**
         * Gets the playing status for track
         */
        AudioSource.prototype.isPlaying = function () {
            var result = false;
            if (this._audio != null) {
                result = this._audio.isPlaying;
            }
            return result;
        };
        /**
         * Gets the paused status for track
         */
        AudioSource.prototype.isPaused = function () {
            var result = false;
            if (this._audio != null) {
                result = this._audio.isPaused;
            }
            return result;
        };
        /**
         * Play the sound track
         * @param time (optional) Start the sound after X seconds. Start immediately (0) by default.
         * @param offset (optional) Start the sound at a specific time in seconds
         * @param length (optional) Sound duration (in seconds)
         */
        AudioSource.prototype.play = function (time, offset, length) {
            var _this = this;
            var result = false;
            if (this._audio != null) {
                if (this._initializedReadyInstance === true) {
                    this._audio.play(time, offset, length);
                }
                else {
                    this.onReadyObservable.addOnce(function () { _this._audio.play(time, offset, length); });
                }
                result = true;
            }
            return result;
        };
        /**
         * Pause the sound track
         */
        AudioSource.prototype.pause = function () {
            var result = false;
            if (this._audio != null) {
                this._audio.pause();
                result = true;
            }
            return result;
        };
        /**
         * Stop the sound track
         * @param time (optional) Start the sound after X seconds. Start immediately (0) by default.
         */
        AudioSource.prototype.stop = function (time) {
            var result = false;
            if (this._audio != null) {
                this._audio.stop(time);
                result = true;
            }
            return result;
        };
        /**
         * Mute the sound track
         * @param time (optional) Mute the sound after X seconds. Start immediately (0) by default.
         */
        AudioSource.prototype.mute = function (time) {
            var result = false;
            if (this._audio != null) {
                this._lastmutedvolume = this._audio.getVolume();
                this._audio.setVolume(0, time);
            }
            return result;
        };
        /**
         * Unmute the sound track
         * @param time (optional) Unmute the sound after X seconds. Start immediately (0) by default.
         */
        AudioSource.prototype.unmute = function (time) {
            var result = false;
            if (this._audio != null) {
                if (this._lastmutedvolume != null) {
                    this._audio.setVolume(this._lastmutedvolume, time);
                    this._lastmutedvolume = null;
                }
            }
            return result;
        };
        /**
         * Gets the volume of the track
         */
        AudioSource.prototype.getVolume = function () {
            var result = 0;
            if (this._audio != null) {
                result = this._audio.getVolume();
            }
            return result;
        };
        /**
         * Sets the volume of the track
         * @param volume Define the new volume of the sound
         * @param time Define time for gradual change to new volume
         */
        AudioSource.prototype.setVolume = function (volume, time) {
            var result = false;
            if (this._audio != null) {
                this._audio.setVolume(volume, time);
                result = true;
            }
            return result;
        };
        /**
         * Gets the spatial sound option of the track
         */
        AudioSource.prototype.getSpatialSound = function () {
            var result = false;
            if (this._audio != null) {
                result = this._audio.spatialSound;
            }
            return result;
        };
        /**
         * Gets the spatial sound option of the track
         * @param value Define the value of the spatial sound
         */
        AudioSource.prototype.setSpatialSound = function (value) {
            if (this._audio != null) {
                this._audio.spatialSound = value;
            }
        };
        /**
         * Sets the sound track playback speed
         * @param rate the audio playback rate
         */
        AudioSource.prototype.setPlaybackSpeed = function (rate) {
            if (this._audio != null) {
                this._audio.setPlaybackRate(rate);
            }
        };
        /**
         * Gets the current time of the track
         */
        AudioSource.prototype.getCurrentTrackTime = function () {
            var result = 0;
            if (this._audio != null) {
                result = this._audio.currentTime;
            }
            return result;
        };
        return AudioSource;
    }(BABYLON.ScriptComponent));
    BABYLON.AudioSource = AudioSource;
})(BABYLON || (BABYLON = {}));
var BABYLON;
(function (BABYLON) {
    /**
     * Babylon kinematic character controller pro class (Native Bullet Physics 2.82)
     * @class CharacterController - All rights reserved (c) 2020 Mackey Kinard
     */
    var CharacterController = /** @class */ (function (_super) {
        __extends(CharacterController, _super);
        function CharacterController() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._abstractMesh = null;
            _this._avatarRadius = 0.5;
            _this._avatarHeight = 2;
            _this._centerOffset = new BABYLON.Vector3(0, 0, 0);
            _this._skinWidth = 0.08;
            _this._stepOffset = 0.3;
            _this._slopeLimit = 45;
            _this._capsuleSegments = 16;
            _this._minMoveDistance = 0.001;
            _this._isPhysicsReady = false;
            _this._maxCollisions = 4;
            _this._useGhostSweepTest = false;
            _this._tmpCollisionContacts = null;
            _this.updatePosition = true;
            _this.m_character = null;
            _this.m_ghostShape = null;
            _this.m_ghostObject = null;
            _this.m_ghostCollision = null;
            _this.m_ghostTransform = null;
            _this.m_ghostPosition = null;
            _this.m_startPosition = null;
            _this.m_startTransform = null;
            _this.m_walkDirection = null;
            _this.m_warpPosition = null;
            _this.m_turningRate = 0;
            _this.m_moveDeltaX = 0;
            _this.m_moveDeltaZ = 0;
            _this.m_physicsEngine = null;
            _this.m_collisionPosition = BABYLON.Vector3.Zero();
            ///////////////////////////////////////////////////
            // Character Controller Observer Event Functions //
            ///////////////////////////////////////////////////
            /** Register handler that is triggered when the transform position has been updated */
            _this.onUpdatePositionObservable = new BABYLON.Observable();
            /** Register handler that is triggered when the a collision contact has entered */
            _this.onCollisionEnterObservable = new BABYLON.Observable();
            /** Register handler that is triggered when the a collision contact is active */
            _this.onCollisionStayObservable = new BABYLON.Observable();
            /** Register handler that is triggered when the a collision contact has exited */
            _this.onCollisionExitObservable = new BABYLON.Observable();
            return _this;
        }
        CharacterController.prototype.getInternalCharacter = function () { return this.m_character; };
        CharacterController.prototype.getAvatarRadius = function () { return this._avatarRadius; };
        CharacterController.prototype.getAvatarHeight = function () { return this._avatarHeight; };
        CharacterController.prototype.getSkinWidth = function () { return this._skinWidth; };
        CharacterController.prototype.getStepOffset = function () { return this._stepOffset; };
        CharacterController.prototype.getUseSweepTest = function () { return this._useGhostSweepTest; };
        CharacterController.prototype.getMinMoveDistance = function () { return this._minMoveDistance; };
        CharacterController.prototype.setMinMoveDistance = function (distance) { this._minMoveDistance = distance; };
        CharacterController.prototype.getVerticalVelocity = function () { return (this.m_character != null && this.m_character.getVerticalVelocity) ? this.m_character.getVerticalVelocity() : 0; }; // Note: Toolkit Addon Function
        CharacterController.prototype.getAddedMargin = function () { return (this.m_character != null && this.m_character.getAddedMargin) ? this.m_character.getAddedMargin() : 0; }; // Note: Toolkit Addon Function
        CharacterController.prototype.setAddedMargin = function (margin) { if (this.m_character != null && this.m_character.getAddedMargin)
            this.m_character.setAddedMargin(margin); }; // Note: Toolkit Addon Function
        CharacterController.prototype.setMaxJumpHeight = function (maxJumpHeight) { if (this.m_character != null)
            this.m_character.setMaxJumpHeight(maxJumpHeight); };
        CharacterController.prototype.setFallingSpeed = function (fallSpeed) { if (this.m_character != null)
            this.m_character.setFallSpeed(fallSpeed); };
        CharacterController.prototype.getSlopeLimit = function () { return (this.m_character != null) ? this.m_character.getMaxSlope() : 0; };
        CharacterController.prototype.setSlopeLimit = function (slopeRadians) { if (this.m_character != null)
            this.m_character.setMaxSlope(slopeRadians); };
        CharacterController.prototype.setUpAxis = function (axis) { if (this.m_character != null)
            this.m_character.setUpAxis(axis); };
        CharacterController.prototype.getGravity = function () { return (this.m_character != null) ? this.m_character.getGravity() : 0; };
        CharacterController.prototype.setGravity = function (gravity) { if (this.m_character != null)
            this.m_character.setGravity(gravity); };
        CharacterController.prototype.isGrounded = function () { return (this.m_character != null) ? this.m_character.onGround() : false; };
        CharacterController.prototype.isReady = function () { return (this.m_character != null); };
        CharacterController.prototype.canJump = function () { return (this.m_character != null) ? this.m_character.canJump() : false; };
        CharacterController.prototype.internalWarp = function (position) { if (this.m_character != null)
            this.m_character.warp(position); }; // Position: Ammo.btVector3
        CharacterController.prototype.internalJump = function () { if (this.m_character != null)
            this.m_character.jump(); };
        CharacterController.prototype.internalSetJumpSpeed = function (speed) { if (this.m_character != null)
            this.m_character.setJumpSpeed(speed); };
        CharacterController.prototype.internalSetWalkDirection = function (direction) { if (this.m_character != null)
            this.m_character.setWalkDirection(direction); }; // Direction: Ammo.btVector3
        CharacterController.prototype.internalSetVelocityForTimeInterval = function (velocity, interval) { if (this.m_character != null)
            this.m_character.setVelocityForTimeInterval(velocity, interval); }; // Velocity: Ammo.btVector3
        CharacterController.prototype.awake = function () { this.awakeMovementState(); };
        CharacterController.prototype.start = function () { this.startMovementState(); };
        CharacterController.prototype.update = function () { this.updateMovementState(); };
        CharacterController.prototype.destroy = function () { this.destroyMovementState(); };
        //////////////////////////////////////////////////
        // Protected Character Movement State Functions //
        //////////////////////////////////////////////////
        CharacterController.prototype.awakeMovementState = function () {
            this._abstractMesh = this.getAbstractMesh();
            this._avatarRadius = this.getProperty("avatarRadius", this._avatarRadius);
            this._avatarHeight = this.getProperty("avatarHeight", this._avatarHeight);
            this._skinWidth = this.getProperty("skinWidth", this._skinWidth);
            this._slopeLimit = this.getProperty("slopeLimit", this._slopeLimit);
            this._stepOffset = this.getProperty("stepOffset", this._stepOffset);
            this._minMoveDistance = this.getProperty("minMoveDistance", this._minMoveDistance);
            this._capsuleSegments = this.getProperty("capsuleSegments", this._capsuleSegments);
            this._useGhostSweepTest = this.getProperty("useGhostSweepTest", this._useGhostSweepTest);
            this.m_warpPosition = new Ammo.btVector3(0, 0, 0);
            this.m_walkDirection = new Ammo.btVector3(0, 0, 0);
            this.m_physicsEngine = BABYLON.SceneManager.GetPhysicsEngine(this.scene);
            //
            var centerOffsetData = this.getProperty("centerOffset");
            if (centerOffsetData != null)
                this._centerOffset = BABYLON.Utilities.ParseVector3(centerOffsetData);
            // console.warn("Starting Character Controller For: " + this.transform.name);
            this.setMaxNotifications(this._maxCollisions);
            var world = BABYLON.SceneManager.GetPhysicsWorld(this.scene);
            if (world != null) {
                var startingPos = BABYLON.Utilities.GetAbsolutePosition(this.transform, this._centerOffset);
                this.m_startPosition = new Ammo.btVector3(startingPos.x, startingPos.y, startingPos.z);
                this.m_startTransform = new Ammo.btTransform();
                this.m_startTransform.setIdentity();
                this.m_startTransform.setOrigin(this.m_startPosition);
                // ..
                // Create a debug collision shape
                // ..
                var showDebugColliders = BABYLON.Utilities.ShowDebugColliders();
                var colliderVisibility = BABYLON.Utilities.ColliderVisibility();
                if (showDebugColliders === true && this.transform._debugCollider == null) {
                    var capsuleSize = new BABYLON.Vector3(this._avatarRadius, this._avatarHeight, 1);
                    capsuleSize.x *= Math.max(Math.abs(this.transform.scaling.x), Math.abs(this.transform.scaling.z));
                    capsuleSize.y *= this.transform.scaling.y;
                    var debugName = this.transform.name + ".Debug";
                    var debugCapsule = BABYLON.MeshBuilder.CreateCapsule(debugName, { tessellation: this._capsuleSegments, subdivisions: 8, capSubdivisions: 16, height: capsuleSize.y, radius: capsuleSize.x }, this.scene);
                    debugCapsule.position.set(0, 0, 0);
                    debugCapsule.rotationQuaternion = this.transform.rotationQuaternion.clone();
                    debugCapsule.setParent(this.transform);
                    debugCapsule.position.copyFrom(this._centerOffset);
                    debugCapsule.visibility = colliderVisibility;
                    debugCapsule.material = BABYLON.Utilities.GetColliderMaterial(this.scene);
                    debugCapsule.checkCollisions = false;
                    debugCapsule.isPickable = false;
                    this.transform._debugCollider = debugCapsule;
                }
                // Create a ghost collision shape
                this.m_ghostShape = new Ammo.btCapsuleShape(this._avatarRadius, this._avatarHeight / 2);
                this.m_ghostShape.setMargin((this._skinWidth + BABYLON.CharacterController.MARGIN_FACTOR));
                // Create a ghost collision object
                this.m_ghostObject = new Ammo.btPairCachingGhostObject();
                this.m_ghostObject.setWorldTransform(this.m_startTransform);
                this.m_ghostObject.setCollisionShape(this.m_ghostShape);
                this.m_ghostObject.setCollisionFlags(BABYLON.CollisionFlags.CF_CHARACTER_OBJECT);
                // Create a ghost collision casting
                this.m_ghostCollision = Ammo.castObject(this.m_ghostObject, Ammo.btCollisionObject);
                // DEPRECIATED: this.m_ghostCollision.setContactProcessingThreshold(0);
                this.m_ghostCollision.entity = this._abstractMesh;
                // Create kinematic character controller
                this.m_character = new Ammo.btKinematicCharacterController(this.m_ghostObject, this.m_ghostShape, this._stepOffset);
                this.m_character.setUseGhostSweepTest(this._useGhostSweepTest);
                this.m_character.setUpInterpolate(true);
                this.m_character.setMaxSlope(BABYLON.Tools.ToRadians(this._slopeLimit));
                this.m_character.setGravity(BABYLON.System.Gravity3G);
                // Add ghost object and character to world
                world.addCollisionObject(this.m_ghostObject, BABYLON.CollisionFilters.CharacterFilter, BABYLON.CollisionFilters.StaticFilter | BABYLON.CollisionFilters.DefaultFilter | BABYLON.CollisionFilters.CharacterFilter);
                world.addAction(this.m_character);
            }
            else {
                BABYLON.Tools.Warn("Null physics world detected. Failed to create character controller: " + this.transform.name);
            }
            this._isPhysicsReady = (this.m_physicsEngine != null && this._tmpCollisionContacts != null && this.m_ghostObject != null && this._abstractMesh != null);
        };
        CharacterController.prototype.startMovementState = function () {
            this.updateMovementState();
        };
        CharacterController.prototype.syncMovementState = function () {
            if (this._isPhysicsReady === true) {
                this.m_ghostTransform = this.m_ghostObject.getWorldTransform();
                if (this.m_ghostTransform != null) {
                    this.m_ghostPosition = this.m_ghostTransform.getOrigin();
                }
                else {
                    this.m_ghostPosition = null;
                }
            }
        };
        CharacterController.prototype.updateMovementState = function () {
            this.syncMovementState();
            if (this._isPhysicsReady === true) {
                if (this.m_ghostPosition != null) {
                    if (this.updatePosition === true) {
                        // DEPRECIATED: this.transform.position.set(this.m_ghostPosition.x(), this.m_ghostPosition.y(), this.m_ghostPosition.z());
                        this.m_collisionPosition.set(this.m_ghostPosition.x(), this.m_ghostPosition.y(), this.m_ghostPosition.z());
                        if (this._centerOffset != null) {
                            // Note: Subtract Character Controller Center Offset
                            this.m_collisionPosition.subtractInPlace(this._centerOffset);
                        }
                        this.transform.position.copyFrom(this.m_collisionPosition);
                    }
                    else {
                        this.setGhostWorldPosition(this.transform.position);
                    }
                    if (this.onUpdatePositionObservable.hasObservers() === true) {
                        this.onUpdatePositionObservable.notifyObservers(this.transform);
                    }
                }
            }
            this.parseGhostCollisionContacts();
        };
        CharacterController.prototype.parseGhostCollisionContacts = function () {
            if (this._isPhysicsReady === true) {
                var hasEnterObservers = this.onCollisionEnterObservable.hasObservers();
                var hasStayObservers = this.onCollisionStayObservable.hasObservers();
                var hasExitObservers = this.onCollisionExitObservable.hasObservers();
                if (hasEnterObservers || hasStayObservers || hasExitObservers) {
                    var index = 0; // Note: Flag All Collision List Items For End Contact State
                    for (index = 0; index < this._tmpCollisionContacts.length; index++) {
                        this._tmpCollisionContacts[index].reset = true;
                    }
                    // ..
                    // Parse Overlapping Ghost Contact Objects
                    // ..
                    var contacts = this.m_ghostObject.getNumOverlappingObjects();
                    if (contacts > this._maxCollisions)
                        contacts = this._maxCollisions;
                    if (contacts > 0) {
                        for (index = 0; index < contacts; index++) {
                            var contactObject = this.m_ghostObject.getOverlappingObject(index);
                            if (contactObject != null) {
                                var contactBody = Ammo.castObject(contactObject, Ammo.btCollisionObject);
                                if (contactBody != null && contactBody.entity != null && contactBody.isActive()) {
                                    var foundindex = -1;
                                    var contactMesh = contactBody.entity;
                                    for (index = 0; index < this._tmpCollisionContacts.length; index++) {
                                        var check = this._tmpCollisionContacts[index];
                                        if (check.mesh != null && check.mesh === contactMesh) {
                                            check.state = 1;
                                            check.reset = false;
                                            foundindex = index;
                                            break;
                                        }
                                    }
                                    if (foundindex === -1) {
                                        for (index = 0; index < this._tmpCollisionContacts.length; index++) {
                                            var insert = this._tmpCollisionContacts[index];
                                            if (insert.mesh == null) {
                                                insert.mesh = contactMesh;
                                                insert.state = 0;
                                                insert.reset = false;
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    // ..
                    // Dispatch Ghost Collision Contact State
                    // ..
                    for (index = 0; index < this._tmpCollisionContacts.length; index++) {
                        var info = this._tmpCollisionContacts[index];
                        if (info.reset === true) {
                            // Dispatch On Collision Exit Event
                            if (hasExitObservers && info.mesh != null) {
                                this.onCollisionExitObservable.notifyObservers(info.mesh);
                            }
                            // Reset Collision Contact Info Item
                            info.mesh = null;
                            info.state = 0;
                            info.reset = false;
                        }
                        else {
                            if (info.state === 0) {
                                // Dispatch On Collision Enter Event
                                if (hasEnterObservers && info.mesh != null) {
                                    this.onCollisionEnterObservable.notifyObservers(info.mesh);
                                }
                            }
                            else {
                                // Dispatch On Collision Stay Event
                                if (hasStayObservers && info.mesh != null) {
                                    this.onCollisionStayObservable.notifyObservers(info.mesh);
                                }
                            }
                        }
                    }
                }
            }
        };
        CharacterController.prototype.destroyMovementState = function () {
            this.m_physicsEngine = null;
            if (this.m_character != null) {
                Ammo.destroy(this.m_character);
                this.m_character = null;
            }
            if (this.m_ghostObject != null) {
                Ammo.destroy(this.m_ghostObject);
                this.m_ghostObject = null;
            }
            if (this.m_ghostShape != null) {
                Ammo.destroy(this.m_ghostShape);
                this.m_ghostShape = null;
            }
            if (this.m_ghostCollision != null) {
                Ammo.destroy(this.m_ghostCollision); // ???
                this.m_ghostCollision = null;
            }
            if (this.m_ghostPosition != null) {
                Ammo.destroy(this.m_ghostPosition); // ???
                this.m_ghostPosition = null;
            }
            if (this.m_ghostTransform != null) {
                Ammo.destroy(this.m_ghostTransform); // ???
                this.m_ghostTransform = null;
            }
            if (this.m_startPosition != null) {
                Ammo.destroy(this.m_startPosition);
                this.m_startPosition = null;
            }
            if (this.m_startTransform != null) {
                Ammo.destroy(this.m_startTransform);
                this.m_startTransform = null;
            }
            if (this.m_warpPosition != null) {
                Ammo.destroy(this.m_warpPosition);
                this.m_warpPosition = null;
            }
            if (this.m_walkDirection != null) {
                Ammo.destroy(this.m_walkDirection);
                this.m_walkDirection = null;
            }
            this.onUpdatePositionObservable.clear();
            this.onUpdatePositionObservable = null;
            this.onCollisionEnterObservable.clear();
            this.onCollisionEnterObservable = null;
            this.onCollisionStayObservable.clear();
            this.onCollisionStayObservable = null;
            this.onCollisionExitObservable.clear();
            this.onCollisionExitObservable = null;
            this._tmpCollisionContacts = null;
            this._abstractMesh = null;
        };
        ////////////////////////////////////////////////////
        // Character Controller Advanced Helper Functions //
        ////////////////////////////////////////////////////
        /** Sets the maximum number of simultaneous contact notfications to dispatch per frame. Defaults value is 4. (Advanved Use Only) */
        CharacterController.prototype.setMaxNotifications = function (max) {
            this._maxCollisions = max;
            this._tmpCollisionContacts = [];
            for (var index = 0; index < this._maxCollisions; index++) {
                this._tmpCollisionContacts.push(new BABYLON.CollisionContactInfo());
            }
        };
        /** Sets character collision activation state using physics ghost object. (Advanved Use Only) */
        CharacterController.prototype.setActivationState = function (state) {
            if (this.m_ghostCollision != null && this.m_ghostCollision.setActivationState) {
                this.m_ghostCollision.setActivationState(state);
            }
        };
        /** Gets character collision group filter using physics ghost object. (Advanved Use Only) */
        CharacterController.prototype.getCollisionFilterGroup = function () {
            var result = -1;
            if (this.m_ghostCollision != null && this.m_ghostCollision.getBroadphaseHandle) {
                result = this.m_ghostCollision.getBroadphaseHandle().get_m_collisionFilterGroup();
            }
            return result;
        };
        /** Sets character collision group filter using physics ghost object. (Advanved Use Only) */
        CharacterController.prototype.setCollisionFilterGroup = function (group) {
            if (this.m_ghostCollision != null && this.m_ghostCollision.getBroadphaseHandle) {
                this.m_ghostCollision.getBroadphaseHandle().set_m_collisionFilterGroup(group);
            }
        };
        /** Gets character collision mask filter using physics ghost object. (Advanved Use Only) */
        CharacterController.prototype.getCollisionFilterMask = function () {
            var result = -1;
            if (this.m_ghostCollision != null && this.m_ghostCollision.getBroadphaseHandle) {
                result = this.m_ghostCollision.getBroadphaseHandle().get_m_collisionFilterMask();
            }
            return result;
        };
        /** Sets the character collision mask filter using physics ghost object. (Advanved Use Only) */
        CharacterController.prototype.setCollisionFilterMask = function (mask) {
            if (this.m_ghostCollision != null && this.m_ghostCollision.getBroadphaseHandle) {
                this.m_ghostCollision.getBroadphaseHandle().set_m_collisionFilterMask(mask);
            }
        };
        /** Gets the chracter contact processing threshold using physics ghost object. (Advanved Use Only) */
        CharacterController.prototype.getContactProcessingThreshold = function () {
            var result = -1;
            if (this.m_ghostCollision != null && this.m_ghostCollision.getContactProcessingThreshold) {
                this.m_ghostCollision.getContactProcessingThreshold();
            }
            return result;
        };
        /** Sets character contact processing threshold using physics ghost object. (Advanved Use Only) */
        CharacterController.prototype.setContactProcessingThreshold = function (threshold) {
            if (this.m_ghostCollision != null && this.m_ghostCollision.setContactProcessingThreshold) {
                this.m_ghostCollision.setContactProcessingThreshold(threshold);
            }
        };
        /** Manually set the position of the physics ghost object world transform. (Advanved Use Only) */
        CharacterController.prototype.setGhostWorldPosition = function (position) {
            if (this.m_ghostObject != null && this.m_ghostTransform != null) {
                if (this.m_ghostPosition != null && position != null) {
                    this.m_ghostPosition.setValue(position.x, position.y, position.z);
                    this.m_ghostTransform.setOrigin(this.m_ghostPosition);
                }
                this.m_ghostObject.setWorldTransform(this.m_ghostTransform);
            }
        };
        ////////////////////////////////////////////////////
        // Public Character Controller Movement Functions //
        ////////////////////////////////////////////////////
        /** Translates the kinematic character with the specfied movement velocity. */
        CharacterController.prototype.move = function (velocity) {
            if (velocity != null) {
                this.m_moveDeltaX = velocity.x;
                this.m_moveDeltaZ = velocity.z;
                if (Math.abs(velocity.x) < this._minMoveDistance) {
                    if (velocity.x > 0) {
                        this.m_moveDeltaX = this._minMoveDistance;
                    }
                    else if (velocity.x < 0) {
                        this.m_moveDeltaX = -this._minMoveDistance;
                    }
                }
                if (Math.abs(velocity.z) < this._minMoveDistance) {
                    if (velocity.z > 0) {
                        this.m_moveDeltaZ = this._minMoveDistance;
                    }
                    else if (velocity.z < 0) {
                        this.m_moveDeltaZ = -this._minMoveDistance;
                    }
                }
                if (this.m_walkDirection != null) {
                    this.m_walkDirection.setValue(this.m_moveDeltaX, 0, this.m_moveDeltaZ);
                    this.internalSetWalkDirection(this.m_walkDirection);
                }
            }
        };
        /** Jumps the kinematic chacracter with the specified jump speed. */
        CharacterController.prototype.jump = function (speed) {
            this.internalSetJumpSpeed(speed);
            this.internalJump();
        };
        /** Warps the kinematic chacracter to the specified warp position. */
        CharacterController.prototype.warp = function (position) {
            if (this.m_warpPosition != null) {
                this.m_warpPosition.setValue(position.x, position.y, position.z);
                this.internalWarp(this.m_warpPosition);
            }
        };
        CharacterController.MARGIN_FACTOR = -0.04;
        return CharacterController;
    }(BABYLON.ScriptComponent));
    BABYLON.CharacterController = CharacterController;
})(BABYLON || (BABYLON = {}));
var BABYLON;
(function (BABYLON) {
    /**
     * Babylon navigation agent pro class (Unity Style Navigation Agent System)
     * @class NavigationAgent - All rights reserved (c) 2020 Mackey Kinard
     */
    var NavigationAgent = /** @class */ (function (_super) {
        __extends(NavigationAgent, _super);
        function NavigationAgent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.distanceToTarget = 0;
            _this.moveDirection = new BABYLON.Vector3(0.0, 0.0, 0.0);
            _this.resetPosition = new BABYLON.Vector3(0.0, 0.0, 0.0);
            _this.lastPosition = new BABYLON.Vector3(0.0, 0.0, 0.0);
            _this.currentPosition = new BABYLON.Vector3(0.0, 0.0, 0.0);
            _this.currentVelocity = new BABYLON.Vector3(0.0, 0.0, 0.0);
            _this.currentWaypoint = new BABYLON.Vector3(0.0, 0.0, 0.0);
            _this.heightOffset = 0;
            _this.angularSpeed = 0;
            _this.updatePosition = true;
            _this.distanceEpsilon = 0.1;
            _this.velocityEpsilon = 1.0;
            _this.stoppingDistance = 0;
            _this.m_agentState = 0;
            _this.m_agentIndex = -1;
            _this.m_agentTrans = null;
            _this.m_agentParams = null;
            _this.m_agentRotation = new BABYLON.Quaternion(0.0, 0.0, 0.0, 1.0);
            _this.m_agentMovement = new BABYLON.Vector3(0.0, 0.0, 0.0);
            _this.m_agentDirection = new BABYLON.Vector3(0.0, 0.0, 1.0);
            _this.m_agentQuaternion = new BABYLON.Quaternion(0.0, 0.0, 0.0, 1.0);
            _this.m_agentDestination = null;
            /** Register handler that is triggered before the navigation update */
            _this.onPreUpdateObservable = new BABYLON.Observable();
            /** Register handler that is triggered after the navigation update */
            _this.onPostUpdateObservable = new BABYLON.Observable();
            /** Register handler that is triggered when the navigation is complete */
            _this.onNavCompleteObservable = new BABYLON.Observable();
            return _this;
        }
        NavigationAgent.prototype.isNavigating = function () { return (this.m_agentDestination != null); };
        NavigationAgent.prototype.getAgentType = function () { return this.type; };
        NavigationAgent.prototype.getAgentState = function () { return this.m_agentState; };
        NavigationAgent.prototype.getAgentIndex = function () { return this.m_agentIndex; };
        NavigationAgent.prototype.getAgentRadius = function () { return this.avoidRadius; };
        NavigationAgent.prototype.getAgentHeight = function () { return this.avoidHeight; };
        NavigationAgent.prototype.getAgentSpeed = function () { return this.speed; };
        NavigationAgent.prototype.getAgentOffset = function () { return this.baseOffset; };
        NavigationAgent.prototype.getTargetDistance = function () { return this.distanceToTarget; };
        NavigationAgent.prototype.awake = function () { this.awakeNavigationAgent(); };
        NavigationAgent.prototype.late = function () { this.updateNavigationAgent(); };
        NavigationAgent.prototype.destroy = function () { this.destroyNavigationAgent(); };
        //////////////////////////////////////////////////////
        // Navigation Private Functions                     //
        //////////////////////////////////////////////////////
        NavigationAgent.prototype.awakeNavigationAgent = function () {
            this.type = this.getProperty("type", this.type);
            this.speed = this.getProperty("speed", this.speed);
            this.baseOffset = this.getProperty("offset", this.baseOffset);
            this.angularSpeed = this.getProperty("angularspeed", this.angularSpeed);
            this.acceleration = this.getProperty("acceleration", this.acceleration);
            this.stoppingDistance = this.getProperty("stoppingdistance", this.stoppingDistance);
            this.autoBraking = this.getProperty("autobraking", this.autoBraking);
            this.avoidRadius = this.getProperty("avoidradius", this.avoidRadius);
            this.avoidHeight = this.getProperty("avoidheight", this.avoidHeight);
            this.obstacleAvoidanceType = this.getProperty("avoidquality", this.obstacleAvoidanceType);
            this.avoidancePriority = this.getProperty("avoidpriority", this.avoidancePriority);
            this.autoTraverseOffMeshLink = this.getProperty("autotraverse", this.autoTraverseOffMeshLink);
            this.autoRepath = this.getProperty("autopepath", this.autoRepath);
            this.areaMask = this.getProperty("areamask", this.areaMask);
            // ..
            BABYLON.Utilities.ValidateTransformQuaternion(this.transform);
            //this.m_agentTrans = BABYLON.Mesh.CreateBox((this.transform.name + "Agent"), 1, this.scene);
            this.m_agentTrans = new BABYLON.TransformNode((this.transform.name + ".Agent"), this.scene);
            this.m_agentTrans.position = new BABYLON.Vector3(0.0, 0.0, 0.0);
            this.m_agentTrans.rotation = new BABYLON.Vector3(0.0, 0.0, 0.0);
            BABYLON.Utilities.ValidateTransformQuaternion(this.m_agentTrans);
            this.lastPosition.copyFrom(this.transform.position);
        };
        NavigationAgent.prototype.updateNavigationAgent = function () {
            var crowd = BABYLON.SceneManager.GetCrowdInterface(this.scene);
            if (crowd == null)
                return; // Note: No Detour Navigation Mesh Available Yet
            if (this.m_agentIndex < 0) {
                this.m_agentParams = {
                    radius: this.avoidRadius,
                    height: this.avoidHeight,
                    maxSpeed: this.speed,
                    maxAcceleration: this.acceleration,
                    collisionQueryRange: 0.5,
                    pathOptimizationRange: 0.0,
                    separationWeight: 1.0
                };
                BABYLON.Utilities.GetAbsolutePositionToRef(this.transform, this.resetPosition);
                this.m_agentIndex = crowd.addAgent(this.resetPosition, this.m_agentParams, this.m_agentTrans);
            }
            // ..
            this.m_agentState = crowd.getAgentState(this.m_agentIndex);
            this.getAgentWaypointToRef(this.currentWaypoint);
            this.getAgentPositionToRef(this.currentPosition);
            if (this.m_agentState === BABYLON.CrowdAgentState.DT_CROWDAGENT_STATE_OFFMESH) {
                this.currentPosition.subtractToRef(this.lastPosition, this.currentVelocity);
                this.currentVelocity.scaleInPlace(this.speed * 1.5);
            }
            else {
                this.getAgentVelocityToRef(this.currentVelocity);
            }
            // ..
            if (this.m_agentDestination != null) {
                this.distanceToTarget = BABYLON.Vector3.Distance(this.currentPosition, this.m_agentDestination);
                if (this.updatePosition === true || this.angularSpeed > 0) {
                    if (this.onPreUpdateObservable.hasObservers() === true) {
                        this.onPreUpdateObservable.notifyObservers(this.transform);
                    }
                    if (this.angularSpeed > 0) {
                        if (this.currentVelocity.length() >= this.velocityEpsilon) {
                            this.currentVelocity.normalize();
                            var rotateFactor = (this.angularSpeed * BABYLON.NavigationAgent.ANGULAR_SPEED_RATIO * this.getDeltaSeconds());
                            if (this.m_agentState === BABYLON.CrowdAgentState.DT_CROWDAGENT_STATE_OFFMESH) {
                                // Rotate Toward Velocity Direction
                                this.moveDirection.copyFrom(this.m_agentDirection);
                                this.m_agentDirection.set((this.moveDirection.x + (this.currentVelocity.x - this.moveDirection.x)), (this.moveDirection.y + (this.currentVelocity.y - this.moveDirection.y)), (this.moveDirection.z + (this.currentVelocity.z - this.moveDirection.z)));
                                this.m_agentDirection.normalize();
                                var targetAngle = (BABYLON.NavigationAgent.TARGET_ANGLE_FACTOR - Math.atan2(this.m_agentDirection.z, this.m_agentDirection.x));
                                BABYLON.Quaternion.FromEulerAnglesToRef(0.0, targetAngle, 0.0, this.m_agentRotation);
                                BABYLON.Quaternion.SlerpToRef(this.transform.rotationQuaternion, this.m_agentRotation, rotateFactor, this.transform.rotationQuaternion);
                            }
                            else {
                                // Rotate Toward Next Target Waypoint
                                this.m_agentQuaternion.copyFrom(this.transform.rotationQuaternion);
                                this.transform.lookAt(this.currentWaypoint);
                                // Correct Transform Look At Rotation
                                this.transform.rotationQuaternion.toEulerAnglesToRef(this.m_agentDirection);
                                BABYLON.Quaternion.FromEulerAnglesToRef(0.0, this.m_agentDirection.y, 0.0, this.m_agentRotation);
                                BABYLON.Quaternion.SlerpToRef(this.m_agentQuaternion, this.m_agentRotation, rotateFactor, this.transform.rotationQuaternion);
                            }
                        }
                    }
                    if (this.updatePosition === true) {
                        this.transform.position.set(this.currentPosition.x, (this.currentPosition.y + this.baseOffset + this.heightOffset), this.currentPosition.z);
                    }
                    if (this.onPostUpdateObservable.hasObservers() === true) {
                        this.onPostUpdateObservable.notifyObservers(this.transform);
                    }
                }
                if (this.distanceToTarget <= Math.max(this.distanceEpsilon, this.stoppingDistance)) {
                    this.cancelNavigation();
                    if (this.onNavCompleteObservable.hasObservers() === true) {
                        this.onNavCompleteObservable.notifyObservers(this.transform);
                    }
                }
            }
            else {
                this.distanceToTarget = 0;
            }
            this.lastPosition.copyFrom(this.transform.position);
        };
        NavigationAgent.prototype.destroyNavigationAgent = function () {
            this.m_agentIndex = -1;
            this.m_agentRotation = null;
            this.m_agentMovement = null;
            this.m_agentDirection = null;
            this.m_agentDestination = null;
            this.moveDirection = null;
            this.resetPosition = null;
            this.lastPosition = null;
            this.currentPosition = null;
            this.currentVelocity = null;
            this.currentWaypoint = null;
            this.onPreUpdateObservable.clear();
            this.onPreUpdateObservable = null;
            this.onPostUpdateObservable.clear();
            this.onPostUpdateObservable = null;
            this.onNavCompleteObservable.clear();
            this.onNavCompleteObservable = null;
            if (this.m_agentTrans != null) {
                this.m_agentTrans.dispose();
                this.m_agentTrans = null;
            }
        };
        //////////////////////////////////////////////////////
        // Navigation Public Functions                      //
        //////////////////////////////////////////////////////
        /** Move agent relative to current position. */
        NavigationAgent.prototype.move = function (offset, closetPoint) {
            if (closetPoint === void 0) { closetPoint = true; }
            var plugin = BABYLON.SceneManager.GetNavigationTools();
            var crowd = BABYLON.SceneManager.GetCrowdInterface(this.scene);
            if (plugin != null && crowd != null) {
                crowd.getAgentPosition(this.m_agentIndex).addToRef(offset, this.m_agentMovement);
                if (closetPoint === true)
                    this.m_agentDestination = plugin.getClosestPoint(this.m_agentMovement);
                else
                    this.m_agentDestination = this.m_agentMovement.clone();
                if (this.m_agentIndex >= 0)
                    crowd.agentGoto(this.m_agentIndex, this.m_agentDestination);
            }
            else {
                BABYLON.Tools.Warn("No recast navigation mesh or crowd interface data available!");
            }
        };
        /** Teleport agent to destination point. */
        NavigationAgent.prototype.teleport = function (destination, closetPoint) {
            if (closetPoint === void 0) { closetPoint = true; }
            var plugin = BABYLON.SceneManager.GetNavigationTools();
            var crowd = BABYLON.SceneManager.GetCrowdInterface(this.scene);
            if (plugin != null && crowd != null) {
                if (closetPoint === true)
                    this.m_agentDestination = plugin.getClosestPoint(destination);
                else
                    this.m_agentDestination = destination.clone();
                if (this.m_agentIndex >= 0)
                    crowd.agentTeleport(this.m_agentIndex, this.m_agentDestination);
            }
            else {
                BABYLON.Tools.Warn("No recast navigation mesh or crowd interface data available!");
            }
        };
        /** Sets agent current destination point. */
        NavigationAgent.prototype.setDestination = function (destination, closetPoint, resetAgent) {
            if (closetPoint === void 0) { closetPoint = true; }
            if (resetAgent === void 0) { resetAgent = true; }
            var plugin = BABYLON.SceneManager.GetNavigationTools();
            var crowd = BABYLON.SceneManager.GetCrowdInterface(this.scene);
            if (plugin != null && crowd != null) {
                if (resetAgent === true)
                    this.resetAgentPosition();
                if (closetPoint === true)
                    this.m_agentDestination = plugin.getClosestPoint(destination);
                else
                    this.m_agentDestination = destination.clone();
                if (this.m_agentIndex >= 0)
                    crowd.agentGoto(this.m_agentIndex, this.m_agentDestination);
            }
            else {
                BABYLON.Tools.Warn("No recast navigation mesh or crowd interface data available!");
            }
        };
        /** Gets agent current world space velocity. */
        NavigationAgent.prototype.getAgentVelocity = function () {
            var crowd = BABYLON.SceneManager.GetCrowdInterface(this.scene);
            return (crowd != null && this.m_agentIndex >= 0) ? crowd.getAgentVelocity(this.m_agentIndex) : null;
        };
        /** Gets agent current world space velocity. */
        NavigationAgent.prototype.getAgentVelocityToRef = function (result) {
            var crowd = BABYLON.SceneManager.GetCrowdInterface(this.scene);
            if (crowd != null && this.m_agentIndex >= 0)
                crowd.getAgentVelocityToRef(this.m_agentIndex, result);
        };
        /** Gets agent current world space position. */
        NavigationAgent.prototype.getAgentPosition = function () {
            var crowd = BABYLON.SceneManager.GetCrowdInterface(this.scene);
            return (crowd != null && this.m_agentIndex >= 0) ? crowd.getAgentPosition(this.m_agentIndex) : null;
        };
        /** Gets agent current world space position. */
        NavigationAgent.prototype.getAgentPositionToRef = function (result) {
            var crowd = BABYLON.SceneManager.GetCrowdInterface(this.scene);
            if (crowd != null && this.m_agentIndex >= 0)
                crowd.getAgentPositionToRef(this.m_agentIndex, result);
        };
        /** Gets agent current waypoint position. */
        NavigationAgent.prototype.getAgentWaypoint = function () {
            var crowd = BABYLON.SceneManager.GetCrowdInterface(this.scene);
            return (crowd != null && this.m_agentIndex >= 0) ? crowd.getAgentNextTargetPath(this.m_agentIndex) : null;
        };
        /** Gets agent current waypoint position. */
        NavigationAgent.prototype.getAgentWaypointToRef = function (result) {
            var crowd = BABYLON.SceneManager.GetCrowdInterface(this.scene);
            if (crowd != null && this.m_agentIndex >= 0)
                crowd.getAgentNextTargetPathToRef(this.m_agentIndex, result);
        };
        /** Reset the agent to transform world space position. */
        NavigationAgent.prototype.resetAgentPosition = function () {
            this.m_agentDestination = null; // Note: Disable Auto Position Update
            BABYLON.Utilities.GetAbsolutePositionToRef(this.transform, this.resetPosition);
            var crowd = BABYLON.SceneManager.GetCrowdInterface(this.scene);
            if (crowd != null && this.m_agentIndex >= 0)
                crowd.agentTeleport(this.m_agentIndex, this.resetPosition);
        };
        /** Cancel current waypoint path navigation. */
        NavigationAgent.prototype.cancelNavigation = function () {
            this.m_agentDestination = null; // Note: Disable Auto Position Update
            var crowd = BABYLON.SceneManager.GetCrowdInterface(this.scene);
            var position = this.getAgentPosition();
            if (position != null && crowd != null && this.m_agentIndex >= 0) {
                crowd.agentTeleport(this.m_agentIndex, position);
                position.y += (this.baseOffset + this.heightOffset);
                this.transform.position.copyFrom(position);
            }
        };
        NavigationAgent.TARGET_ANGLE_FACTOR = (Math.PI * 0.5);
        NavigationAgent.ANGULAR_SPEED_RATIO = 0.1;
        return NavigationAgent;
    }(BABYLON.ScriptComponent));
    BABYLON.NavigationAgent = NavigationAgent;
    /**
     *  Recast Detour Crowd Agent States
     */
    var CrowdAgentState;
    (function (CrowdAgentState) {
        CrowdAgentState[CrowdAgentState["DT_CROWDAGENT_STATE_INVALID"] = 0] = "DT_CROWDAGENT_STATE_INVALID";
        CrowdAgentState[CrowdAgentState["DT_CROWDAGENT_STATE_WALKING"] = 1] = "DT_CROWDAGENT_STATE_WALKING";
        CrowdAgentState[CrowdAgentState["DT_CROWDAGENT_STATE_OFFMESH"] = 2] = "DT_CROWDAGENT_STATE_OFFMESH";
    })(CrowdAgentState = BABYLON.CrowdAgentState || (BABYLON.CrowdAgentState = {}));
    ;
})(BABYLON || (BABYLON = {}));
var BABYLON;
(function (BABYLON) {
    /**
     * Babylon raycast vehicle controller pro class (Native Bullet Physics 2.82)
     * @class RaycastVehicle - All rights reserved (c) 2020 Mackey Kinard
     */
    var RaycastVehicle = /** @class */ (function () {
        function RaycastVehicle(entity, world, center, defaultAngularFactor) {
            if (defaultAngularFactor === void 0) { defaultAngularFactor = null; }
            this._centerMass = new BABYLON.Vector3(0, 0, 0);
            this._chassisMesh = null;
            this._tempVectorPos = new BABYLON.Vector3(0, 0, 0);
            this.lockedWheelIndexes = null;
            this.m_vehicle = null;
            this.m_vehicleTuning = null;
            this.m_vehicleRaycaster = null;
            this.m_vehicleColliders = null;
            this.m_tempTransform = null;
            this.m_tempPosition = null;
            this.m_wheelDirectionCS0 = null;
            this.m_wheelAxleCS = null;
            this._chassisMesh = entity;
            this._centerMass = center;
            this.m_vehicleTuning = new Ammo.btVehicleTuning();
            this.m_vehicleRaycaster = (Ammo.btSmoothVehicleRaycaster != null) ? new Ammo.btSmoothVehicleRaycaster(world) : new Ammo.btDefaultVehicleRaycaster(world);
            this.m_vehicleColliders = (this._chassisMesh.metadata != null && this._chassisMesh.metadata.unity != null && this._chassisMesh.metadata.unity.wheels != null) ? this._chassisMesh.metadata.unity.wheels : null;
            this.m_vehicle = new Ammo.btRaycastVehicle(this.m_vehicleTuning, this._chassisMesh.physicsImpostor.physicsBody, this.m_vehicleRaycaster);
            this.m_vehicle.setCoordinateSystem(0, 1, 2); // Y-UP-AXIS
            this.m_wheelDirectionCS0 = new Ammo.btVector3(0, -1, 0); // Y-UP-AXIS
            this.m_wheelAxleCS = new Ammo.btVector3(-1, 0, 0); // Y-UP-AXIS
            this.m_tempPosition = null;
            this.m_tempTransform = null;
            this.setupWheelInformation(defaultAngularFactor);
            world.addAction(this.m_vehicle);
            if (Ammo.btSmoothVehicleRaycaster == null)
                BABYLON.Tools.Warn("Using Default Vehicle Raycaster For:" + entity.name);
        }
        RaycastVehicle.prototype.getInternalVehicle = function () { return this.m_vehicle; };
        RaycastVehicle.prototype.getUpAxis = function () { if (this.m_vehicle != null)
            return this.m_vehicle.getUpAxis(); };
        RaycastVehicle.prototype.getRightAxis = function () { if (this.m_vehicle != null)
            return this.m_vehicle.getRightAxis(); };
        RaycastVehicle.prototype.getForwardAxis = function () { if (this.m_vehicle != null)
            return this.m_vehicle.getForwardAxis(); };
        RaycastVehicle.prototype.getForwardVector = function () { if (this.m_vehicle != null)
            return this.m_vehicle.getForwardVector(); };
        RaycastVehicle.prototype.getNumWheels = function () { if (this.m_vehicle != null)
            return this.m_vehicle.getNumWheels(); };
        RaycastVehicle.prototype.getWheelInfo = function (wheel) { if (this.m_vehicle != null)
            return this.m_vehicle.getWheelInfo(wheel); }; // Ammo.btWheelInfo
        RaycastVehicle.prototype.resetSuspension = function () { if (this.m_vehicle != null)
            this.m_vehicle.resetSuspension(); };
        RaycastVehicle.prototype.setPitchControl = function (pitch) { if (this.m_vehicle != null)
            this.m_vehicle.setPitchControl(pitch); };
        RaycastVehicle.prototype.setEngineForce = function (power, wheel) { if (this.m_vehicle != null)
            this.m_vehicle.applyEngineForce(power, wheel); };
        RaycastVehicle.prototype.setBrakingForce = function (brake, wheel) { if (this.m_vehicle != null)
            this.m_vehicle.setBrake(brake, wheel); };
        RaycastVehicle.prototype.getWheelTransform = function (wheel) { if (this.m_vehicle != null)
            return this.m_vehicle.getWheelTransformWS(wheel); }; // Ammo.btTransform
        RaycastVehicle.prototype.updateWheelTransform = function (wheel, interpolate) { if (this.m_vehicle != null)
            this.m_vehicle.updateWheelTransform(wheel, interpolate); };
        RaycastVehicle.prototype.getUserConstraintType = function () { if (this.m_vehicle != null)
            return this.m_vehicle.getUserConstraintType(); };
        RaycastVehicle.prototype.setUserConstraintType = function (userConstraintType) { if (this.m_vehicle != null)
            this.m_vehicle.setUserConstraintType(userConstraintType); };
        RaycastVehicle.prototype.setUserConstraintId = function (uid) { if (this.m_vehicle != null)
            this.m_vehicle.setUserConstraintId(uid); };
        RaycastVehicle.prototype.getUserConstraintId = function () { if (this.m_vehicle != null)
            return this.m_vehicle.getUserConstraintId(); };
        RaycastVehicle.prototype.getRawCurrentSpeedKph = function () { if (this.m_vehicle != null)
            return this.m_vehicle.getCurrentSpeedKmHour(); };
        RaycastVehicle.prototype.getRawCurrentSpeedMph = function () { if (this.m_vehicle != null)
            return this.m_vehicle.getCurrentSpeedKmHour() * BABYLON.System.Kph2Mph; };
        RaycastVehicle.prototype.getAbsCurrentSpeedKph = function () { if (this.m_vehicle != null)
            return Math.abs(this.m_vehicle.getCurrentSpeedKmHour()); };
        RaycastVehicle.prototype.getAbsCurrentSpeedMph = function () { if (this.m_vehicle != null)
            return Math.abs(this.m_vehicle.getCurrentSpeedKmHour()) * BABYLON.System.Kph2Mph; };
        RaycastVehicle.prototype.getVehicleTuningSystem = function () { return this.m_vehicleTuning; }; // Ammo.btVehicleTuning
        RaycastVehicle.prototype.getChassisWorldTransform = function () { if (this.m_vehicle != null)
            return this.m_vehicle.getChassisWorldTransform(); }; // Ammo.btTransform
        RaycastVehicle.prototype.dispose = function () {
            this.deleteWheelInformation();
            if (this.m_vehicle != null) {
                Ammo.destroy(this.m_vehicle);
                this.m_vehicle = null;
            }
            if (this.m_vehicleTuning != null) {
                Ammo.destroy(this.m_vehicleTuning);
                this.m_vehicleTuning = null;
            }
            if (this.m_vehicleRaycaster != null) {
                Ammo.destroy(this.m_vehicleRaycaster);
                this.m_vehicleRaycaster = null;
            }
            if (this.m_wheelDirectionCS0 != null) {
                Ammo.destroy(this.m_wheelDirectionCS0);
                this.m_wheelDirectionCS0 = null;
            }
            if (this.m_wheelAxleCS != null) {
                Ammo.destroy(this.m_wheelAxleCS);
                this.m_wheelAxleCS = null;
            }
            if (this.m_tempPosition != null) {
                Ammo.destroy(this.m_tempPosition); // ???
                this.m_tempPosition = null;
            }
            if (this.m_tempTransform != null) {
                Ammo.destroy(this.m_tempTransform); // ???
                this.m_tempTransform = null;
            }
            this.m_vehicleColliders = null;
        };
        ///////////////////////////////////////////////////////
        // Static Raycast Vehicle Instance Helper Functions
        ///////////////////////////////////////////////////////
        /** Gets the rigidbody raycast vehicle controller for the entity. Note: Wheel collider metadata informaion is required for raycast vehicle control. */
        RaycastVehicle.GetInstance = function (scene, rigidbody, defaultAngularFactor) {
            if (defaultAngularFactor === void 0) { defaultAngularFactor = null; }
            var anybody = rigidbody;
            if (anybody.m_raycastVehicle == null) {
                if (rigidbody.hasWheelColliders()) {
                    var rightHanded = BABYLON.SceneManager.GetRightHanded(scene);
                    if (rightHanded === true)
                        BABYLON.Tools.Warn("Raycast vehicle not supported for right handed scene: " + anybody._abstractMesh.name);
                    anybody.m_raycastVehicle = new BABYLON.RaycastVehicle(anybody._abstractMesh, anybody.m_physicsWorld, anybody._centerOfMass, defaultAngularFactor);
                }
                else {
                    BABYLON.Tools.Warn("No wheel collider metadata found for: " + anybody._abstractMesh.name);
                }
            }
            return anybody.m_raycastVehicle;
        };
        ///////////////////////////////////////////////////////
        // Smooth Raycast Vehicle Advanced Helper Functions
        ///////////////////////////////////////////////////////
        /** Gets vehicle enable multi raycast flag using physics vehicle object. (Advanved Use Only) */
        RaycastVehicle.prototype.getEnableMultiRaycast = function () {
            var result = false;
            if (this.m_vehicle != null && this.m_vehicle.get_m_enableMultiRaycast) {
                result = this.m_vehicle.get_m_enableMultiRaycast();
            }
            return result;
        };
        /** Sets vehicle enable multi raycast flag using physics vehicle object. (Advanved Use Only) */
        RaycastVehicle.prototype.setEnableMultiRaycast = function (flag) {
            if (this.m_vehicle != null && this.m_vehicle.set_m_enableMultiRaycast) {
                this.m_vehicle.set_m_enableMultiRaycast(flag);
            }
        };
        /** Gets vehicle stable force using physics vehicle object. (Advanved Use Only) */
        RaycastVehicle.prototype.getStabilizingForce = function () {
            var result = -1;
            if (this.m_vehicle != null && this.m_vehicle.get_m_stabilizingForce) {
                result = this.m_vehicle.get_m_stabilizingForce();
            }
            return result;
        };
        /** Sets vehicle stable force using physics vehicle object. (Advanved Use Only) */
        RaycastVehicle.prototype.setStabilizingForce = function (force) {
            if (this.m_vehicle != null && this.m_vehicle.set_m_stabilizingForce) {
                this.m_vehicle.set_m_stabilizingForce(force);
            }
        };
        /** Gets vehicle smooth flying impulse force using physics vehicle object. (Advanved Use Only) */
        RaycastVehicle.prototype.getSmoothFlyingImpulse = function () {
            var result = -1;
            if (this.m_vehicle != null && this.m_vehicle.get_m_smoothFlyingImpulse) {
                result = this.m_vehicle.get_m_smoothFlyingImpulse();
            }
            return result;
        };
        /** Sets vehicle smooth flying impulse using physics vehicle object. (Advanved Use Only) */
        RaycastVehicle.prototype.setSmoothFlyingImpulse = function (impulse) {
            if (this.m_vehicle != null && this.m_vehicle.set_m_smoothFlyingImpulse) {
                this.m_vehicle.set_m_smoothFlyingImpulse(impulse);
            }
        };
        /** Gets vehicle track connection accel force using physics vehicle object. (Advanved Use Only) */
        RaycastVehicle.prototype.getTrackConnectionAccel = function () {
            var result = -1;
            if (this.m_vehicle != null && this.m_vehicle.get_m_trackConnectionAccel) {
                result = this.m_vehicle.get_m_trackConnectionAccel();
            }
            return result;
        };
        /** Sets vehicle track connection accel force using physics vehicle object. (Advanved Use Only) */
        RaycastVehicle.prototype.setTrackConnectionAccel = function (force) {
            if (this.m_vehicle != null && this.m_vehicle.set_m_trackConnectionAccel) {
                this.m_vehicle.set_m_trackConnectionAccel(force);
            }
        };
        /** Gets vehicle min wheel contact count using physics vehicle object. (Advanved Use Only) */
        RaycastVehicle.prototype.getMinimumWheelContacts = function () {
            var result = -1;
            if (this.m_vehicle != null && this.m_vehicle.get_m_minimumWheelContacts) {
                result = this.m_vehicle.get_m_minimumWheelContacts();
            }
            return result;
        };
        /** Sets vehicle min wheel contact count using physics vehicle object. (Advanved Use Only) */
        RaycastVehicle.prototype.setMinimumWheelContacts = function (force) {
            if (this.m_vehicle != null && this.m_vehicle.set_m_minimumWheelContacts) {
                this.m_vehicle.set_m_minimumWheelContacts(force);
            }
        };
        /** Gets vehicle interpolate mesh normals flag using physics raycaster object. (Advanved Use Only) */
        RaycastVehicle.prototype.getInterpolateNormals = function () {
            var result = false;
            if (this.m_vehicleRaycaster != null && this.m_vehicleRaycaster.get_m_interpolateNormals) {
                result = this.m_vehicleRaycaster.get_m_interpolateNormals();
            }
            return result;
        };
        /** Sets the vehicle interpolate mesh normals using physics raycaster object. (Advanved Use Only) */
        RaycastVehicle.prototype.setInterpolateNormals = function (flag) {
            if (this.m_vehicleRaycaster != null && this.m_vehicleRaycaster.set_m_interpolateNormals) {
                this.m_vehicleRaycaster.set_m_interpolateNormals(flag);
            }
        };
        /** Gets vehicle shape testing mode using physics raycaster object. (Advanved Use Only) */
        RaycastVehicle.prototype.getShapeTestingMode = function () {
            var result = false;
            if (this.m_vehicleRaycaster != null && this.m_vehicleRaycaster.get_m_shapeTestingMode) {
                result = this.m_vehicleRaycaster.get_m_shapeTestingMode();
            }
            return result;
        };
        /** Sets the vehicle shape testing mode using physics raycaster object. (Advanved Use Only) */
        RaycastVehicle.prototype.setShapeTestingMode = function (mode) {
            if (this.m_vehicleRaycaster != null && this.m_vehicleRaycaster.set_m_shapeTestingMode) {
                this.m_vehicleRaycaster.set_m_shapeTestingMode(mode);
            }
        };
        /** Gets vehicle shape testing size using physics raycaster object. (Advanved Use Only) */
        RaycastVehicle.prototype.getShapeTestingSize = function () {
            var result = 0;
            if (this.m_vehicleRaycaster != null && this.m_vehicleRaycaster.get_m_shapeTestingSize) {
                result = this.m_vehicleRaycaster.get_m_shapeTestingSize();
            }
            return result;
        };
        /** Sets the vehicle shape testing mode using physics raycaster object. (Advanved Use Only) */
        RaycastVehicle.prototype.setShapeTestingSize = function (size) {
            if (this.m_vehicleRaycaster != null && this.m_vehicleRaycaster.set_m_shapeTestingSize) {
                this.m_vehicleRaycaster.set_m_shapeTestingSize(size);
            }
        };
        /** Gets vehicle shape test point count using physics raycaster object. (Advanved Use Only) */
        RaycastVehicle.prototype.getShapeTestingCount = function () {
            var result = 0;
            if (this.m_vehicleRaycaster != null && this.m_vehicleRaycaster.get_m_testPointCount) {
                result = this.m_vehicleRaycaster.get_m_testPointCount();
            }
            return result;
        };
        /** Sets the vehicle shape test point count using physics raycaster object. (Advanved Use Only) */
        RaycastVehicle.prototype.setShapeTestingCount = function (count) {
            if (this.m_vehicleRaycaster != null && this.m_vehicleRaycaster.set_m_testPointCount) {
                this.m_vehicleRaycaster.set_m_testPointCount(count);
            }
        };
        /** Gets vehicle sweep penetration amount using physics raycaster object. (Advanved Use Only) */
        RaycastVehicle.prototype.getSweepPenetration = function () {
            var result = 0;
            if (this.m_vehicleRaycaster != null && this.m_vehicleRaycaster.get_m_sweepPenetration) {
                result = this.m_vehicleRaycaster.get_m_sweepPenetration();
            }
            return result;
        };
        /** Sets the vehicle sweep penetration amount using physics raycaster object. (Advanved Use Only) */
        RaycastVehicle.prototype.setSweepPenetration = function (amount) {
            if (this.m_vehicleRaycaster != null && this.m_vehicleRaycaster.set_m_sweepPenetration) {
                this.m_vehicleRaycaster.set_m_sweepPenetration(amount);
            }
        };
        ///////////////////////////////////////////////////////
        // Smooth Raycast Vehicle Advanced Collision Functions
        ///////////////////////////////////////////////////////
        /** Gets vehicle collision group filter using physics raycaster object. (Advanved Use Only) */
        RaycastVehicle.prototype.getCollisionFilterGroup = function () {
            var result = -1;
            if (this.m_vehicleRaycaster != null && this.m_vehicleRaycaster.get_m_collisionFilterGroup) {
                result = this.m_vehicleRaycaster.get_m_collisionFilterGroup();
            }
            return result;
        };
        /** Sets vehicle collision group filter using physics raycaster object. (Advanved Use Only) */
        RaycastVehicle.prototype.setCollisionFilterGroup = function (group) {
            if (this.m_vehicleRaycaster != null && this.m_vehicleRaycaster.set_m_collisionFilterGroup) {
                this.m_vehicleRaycaster.set_m_collisionFilterGroup(group);
            }
        };
        /** Gets vehicle collision mask filter using physics raycaster object. (Advanved Use Only) */
        RaycastVehicle.prototype.getCollisionFilterMask = function () {
            var result = -1;
            if (this.m_vehicleRaycaster != null && this.m_vehicleRaycaster.get_m_collisionFilterMask) {
                result = this.m_vehicleRaycaster.get_m_collisionFilterMask();
            }
            return result;
        };
        /** Sets the vehicle collision mask filter using physics raycaster object. (Advanved Use Only) */
        RaycastVehicle.prototype.setCollisionFilterMask = function (mask) {
            if (this.m_vehicleRaycaster != null && this.m_vehicleRaycaster.set_m_collisionFilterMask) {
                this.m_vehicleRaycaster.set_m_collisionFilterMask(mask);
            }
        };
        ///////////////////////////////////////////////////////
        // Raycast Vehicle Wheel Information Helper Funtions
        ///////////////////////////////////////////////////////
        /** Gets the internal wheel index by id string. */
        RaycastVehicle.prototype.getWheelIndexByID = function (id) {
            var result = -1;
            if (this.m_vehicleColliders != null && this.m_vehicleColliders.length > 0) {
                for (var index = 0; index < this.m_vehicleColliders.length; index++) {
                    var wheel = this.m_vehicleColliders[index];
                    if (id.toLowerCase() === wheel.id.toLowerCase()) {
                        result = index;
                        break;
                    }
                }
            }
            return result;
        };
        /** Gets the internal wheel index by name string. */
        RaycastVehicle.prototype.getWheelIndexByName = function (name) {
            var result = -1;
            if (this.m_vehicleColliders != null && this.m_vehicleColliders.length > 0) {
                for (var index = 0; index < this.m_vehicleColliders.length; index++) {
                    var wheel = this.m_vehicleColliders[index];
                    if (name.toLowerCase() === wheel.name.toLowerCase()) {
                        result = index;
                        break;
                    }
                }
            }
            return result;
        };
        /** Gets the internal wheel collider information. */
        RaycastVehicle.prototype.getWheelColliderInfo = function (wheel) {
            var result = -1;
            if (this.m_vehicleColliders != null && this.m_vehicleColliders.length > 0 && this.m_vehicleColliders.length > wheel) {
                result = this.m_vehicleColliders[wheel];
            }
            return result;
        };
        /** Sets the internal wheel hub transform mesh by index. Used to rotate and bounce wheels. */
        RaycastVehicle.prototype.setWheelTransformMesh = function (wheel, transform) {
            if (transform == null)
                return;
            var wheelinfo = this.getWheelInfo(wheel);
            if (wheelinfo != null)
                wheelinfo.transform = transform;
        };
        ///////////////////////////////////////////////////////
        // Smooth Raycast Vehicle Seering Helper Functions
        ///////////////////////////////////////////////////////
        RaycastVehicle.prototype.getVisualSteeringAngle = function (wheel) {
            var result = 0;
            var wheelinfo = this.getWheelInfo(wheel);
            if (wheelinfo != null && wheelinfo.steeringAngle != null) {
                result = wheelinfo.steeringAngle;
            }
            return result;
        };
        RaycastVehicle.prototype.setVisualSteeringAngle = function (angle, wheel) {
            var wheelinfo = this.getWheelInfo(wheel);
            if (wheelinfo != null) {
                wheelinfo.steeringAngle = angle;
            }
        };
        RaycastVehicle.prototype.getPhysicsSteeringAngle = function (wheel) {
            if (this.m_vehicle != null) {
                return Math.abs(this.m_vehicle.getSteeringValue(wheel));
            }
        };
        RaycastVehicle.prototype.setPhysicsSteeringAngle = function (angle, wheel) {
            if (this.m_vehicle != null) {
                this.m_vehicle.setSteeringValue(angle, wheel);
            }
        };
        /////////////////////////////////////////////
        // Setup Wheel Information Helper Funtions //
        /////////////////////////////////////////////
        RaycastVehicle.prototype.setupWheelInformation = function (defaultAngularFactor) {
            if (defaultAngularFactor === void 0) { defaultAngularFactor = null; }
            if (this._chassisMesh != null && this._chassisMesh.physicsImpostor != null && this._chassisMesh.physicsImpostor.physicsBody != null) {
                if (defaultAngularFactor != null) {
                    // https://pybullet.org/Bullet/phpBB3/viewtopic.php?t=8153
                    // prevent vehicle from flip over, by limit the rotation  on forward axis or limit angles for vehicle stablization
                    this._chassisMesh.physicsImpostor.physicsBody.setAngularFactor(new Ammo.btVector3(defaultAngularFactor.x, defaultAngularFactor.y, defaultAngularFactor.z));
                }
                this._chassisMesh.physicsImpostor.physicsBody.setActivationState(BABYLON.CollisionState.DISABLE_DEACTIVATION);
            }
            if (this.m_vehicle != null && this.m_vehicleColliders != null && this.m_vehicleColliders.length > 0) {
                var index = -1;
                for (index = 0; index < this.m_vehicleColliders.length; index++) {
                    var wheel = this.m_vehicleColliders[index];
                    var wheelName = (wheel.name != null) ? wheel.name : "Unknown";
                    var wheelRadius = (wheel.radius != null) ? wheel.radius : 0.35;
                    var wheelHalfTrack = (wheel.position != null && wheel.position.length >= 3) ? wheel.position[0] : 1;
                    var wheelAxisPosition = (wheel.position != null && wheel.position.length >= 3) ? wheel.position[2] : -1;
                    // ..
                    // Raycast Wheel Script Properties
                    // ..
                    var wheelConnectionPoint = (wheel.wheelconnectionpoint != null) ? wheel.wheelconnectionpoint : 0.5;
                    var suspensionRestLength = (wheel.suspensionrestlength != null) ? wheel.suspensionrestlength : 0.3;
                    var isfrontwheel = (wheel.frontwheel != null) ? true : (wheelName.toLowerCase().indexOf("front") >= 0);
                    var wheelposition = wheelAxisPosition;
                    var wheeltracking = wheelHalfTrack;
                    var centermassx = -this._centerMass.x;
                    var centermassz = -this._centerMass.z;
                    this.m_vehicle.addWheel(new Ammo.btVector3((wheeltracking + centermassx), wheelConnectionPoint, (wheelposition + centermassz)), this.m_wheelDirectionCS0, this.m_wheelAxleCS, suspensionRestLength, wheelRadius, this.m_vehicleTuning, isfrontwheel);
                }
                if (this.m_vehicle.getNumWheels() === this.m_vehicleColliders.length) {
                    for (index = 0; index < this.m_vehicleColliders.length; index++) {
                        var wheel = this.m_vehicleColliders[index];
                        var defaultForce = (wheel.totalsuspensionforces != null) ? wheel.totalsuspensionforces : 1000000;
                        var defaultTravel = (wheel.suspensiontravelcm != null) ? wheel.suspensiontravelcm : 25;
                        var defaultRolling = (wheel.rollinfluence != null) ? wheel.rollinfluence : 0.2;
                        var defaultFriction = (wheel.frictionslip != null) ? wheel.frictionslip : 10;
                        var suspensionStiffness = (wheel.suspensionstiffness != null) ? wheel.suspensionstiffness : 50;
                        var suspensionCompression = (wheel.dampingcompression != null) ? wheel.dampingcompression : 3.5;
                        var suspensionDamping = (wheel.dampingrelaxation != null) ? wheel.dampingrelaxation : 4.5;
                        var wheelinfo = this.m_vehicle.getWheelInfo(index);
                        if (wheelinfo != null) {
                            wheelinfo.steeringAngle = 0;
                            wheelinfo.rotationBoost = 0;
                            wheelinfo.defaultFriction = defaultFriction;
                            wheelinfo.set_m_frictionSlip(defaultFriction);
                            wheelinfo.set_m_rollInfluence(defaultRolling);
                            wheelinfo.set_m_maxSuspensionForce(defaultForce);
                            wheelinfo.set_m_maxSuspensionTravelCm(defaultTravel);
                            wheelinfo.set_m_suspensionStiffness(suspensionStiffness);
                            wheelinfo.set_m_wheelsDampingCompression(suspensionCompression);
                            wheelinfo.set_m_wheelsDampingRelaxation(suspensionDamping);
                        }
                    }
                }
                else {
                    BABYLON.Tools.Warn("Failed to create proper number of wheels for: " + this._chassisMesh.name);
                }
            }
        };
        RaycastVehicle.prototype.updateWheelInformation = function () {
            var wheels = this.getNumWheels();
            if (wheels > 0) {
                for (var index = 0; index < wheels; index++) {
                    var wheelinfo = this.getWheelInfo(index);
                    if (wheelinfo != null) {
                        var locked = this.lockedWheelInformation(index);
                        this.updateWheelTransform(index, false);
                        // Update Wheel Information Internals
                        this.m_tempTransform = this.getWheelTransform(index);
                        this.m_tempPosition = this.m_tempTransform.getOrigin();
                        // Sync Wheel Hub Transform To Raycast Wheel
                        if (wheelinfo.transform != null) {
                            var transform = wheelinfo.transform;
                            if (transform.parent != null) {
                                // Update Wheel Hub Position
                                BABYLON.Utilities.ConvertAmmoVector3ToRef(this.m_tempPosition, this._tempVectorPos);
                                BABYLON.Utilities.InverseTransformPointToRef(transform.parent, this._tempVectorPos, this._tempVectorPos);
                                transform.position.y = this._tempVectorPos.y;
                                // Update Wheel Hub Steering
                                var steeringAngle = (wheelinfo.steeringAngle != null) ? wheelinfo.steeringAngle : 0;
                                BABYLON.Quaternion.FromEulerAnglesToRef(0, steeringAngle, 0, transform.rotationQuaternion);
                                // Update Wheel Spinner Rotation
                                if (wheelinfo.spinner != null && wheelinfo.spinner.addRotation) {
                                    if (locked === false) {
                                        var wheelrotation = 0;
                                        var deltaRotation = (wheelinfo.get_m_deltaRotation != null) ? wheelinfo.get_m_deltaRotation() : 0;
                                        var rotationBoost = (wheelinfo.rotationBoost != null) ? wheelinfo.rotationBoost : 0;
                                        if (deltaRotation < 0)
                                            wheelrotation = (deltaRotation + -rotationBoost);
                                        else
                                            wheelrotation = (deltaRotation + rotationBoost);
                                        wheelinfo.spinner.addRotation(wheelrotation, 0, 0);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
        RaycastVehicle.prototype.lockedWheelInformation = function (wheel) {
            var result = false;
            if (this.lockedWheelIndexes != null && this.lockedWheelIndexes.length > 0) {
                for (var index = 0; index < this.lockedWheelIndexes.length; index++) {
                    if (this.lockedWheelIndexes[index] === wheel) {
                        result = true;
                        break;
                    }
                }
            }
            return result;
        };
        RaycastVehicle.prototype.deleteWheelInformation = function () {
            var wheels = this.getNumWheels();
            if (wheels > 0) {
                for (var index = 0; index < wheels; index++) {
                    var info = this.getWheelInfo(index);
                    if (info != null) {
                        if (info.transform != null) {
                            delete info.transform;
                        }
                        if (info.spinner != null) {
                            delete info.spinner;
                        }
                        if (info.steeringAngle != null) {
                            delete info.steeringAngle;
                        }
                        if (info.rotationBoost != null) {
                            delete info.rotationBoost;
                        }
                        if (info.defaultFriction != null) {
                            delete info.defaultFriction;
                        }
                    }
                }
            }
        };
        return RaycastVehicle;
    }());
    BABYLON.RaycastVehicle = RaycastVehicle;
})(BABYLON || (BABYLON = {}));
var BABYLON;
(function (BABYLON) {
    /**
     * Babylon realtime reflection system pro class (Unity Style Realtime Reflection Probes)
     * @class RealtimeReflection - All rights reserved (c) 2020 Mackey Kinard
     */
    var RealtimeReflection = /** @class */ (function (_super) {
        __extends(RealtimeReflection, _super);
        function RealtimeReflection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RealtimeReflection.prototype.awake = function () { };
        RealtimeReflection.prototype.start = function () { };
        RealtimeReflection.prototype.update = function () { };
        RealtimeReflection.prototype.late = function () { };
        RealtimeReflection.prototype.after = function () { };
        RealtimeReflection.prototype.destroy = function () { };
        return RealtimeReflection;
    }(BABYLON.ScriptComponent));
    BABYLON.RealtimeReflection = RealtimeReflection;
})(BABYLON || (BABYLON = {}));
var BABYLON;
(function (BABYLON) {
    /**
     * Babylon full rigidbody physics pro class (Native Bullet Physics 2.82)
     * @class RigidbodyPhysics - All rights reserved (c) 2020 Mackey Kinard
     */
    var RigidbodyPhysics = /** @class */ (function (_super) {
        __extends(RigidbodyPhysics, _super);
        function RigidbodyPhysics() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._abstractMesh = null;
            _this._isKinematic = false;
            _this._maxCollisions = 4;
            _this._isPhysicsReady = false;
            _this._centerOfMass = new BABYLON.Vector3(0, 0, 0);
            _this._tmpLinearFactor = new BABYLON.Vector3(0, 0, 0);
            _this._tmpAngularFactor = new BABYLON.Vector3(0, 0, 0);
            _this._tmpCenterOfMass = new BABYLON.Vector3(0, 0, 0);
            _this._tmpGravityVector = null;
            _this._tmpCollisionContacts = null;
            _this.m_physicsWorld = null;
            _this.m_physicsEngine = null;
            _this.m_raycastVehicle = null;
            /////////////////////////////////////////////////
            // Rigidbody Physics Collision Event Functions //
            /////////////////////////////////////////////////
            /** Register handler that is triggered when the a collision contact has entered */
            _this.onCollisionEnterObservable = new BABYLON.Observable();
            /** Register handler that is triggered when the a collision contact is active */
            _this.onCollisionStayObservable = new BABYLON.Observable();
            /** Register handler that is triggered when the a collision contact has exited */
            _this.onCollisionExitObservable = new BABYLON.Observable();
            return _this;
        }
        Object.defineProperty(RigidbodyPhysics.prototype, "isKinematic", {
            get: function () { return this._isKinematic; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RigidbodyPhysics.prototype, "centerOfMass", {
            get: function () { return this._centerOfMass; },
            enumerable: false,
            configurable: true
        });
        RigidbodyPhysics.prototype.awake = function () { this.awakeRigidbodyState(); };
        RigidbodyPhysics.prototype.update = function () { this.updateRigidbodyState(); };
        RigidbodyPhysics.prototype.after = function () { this.afterRigidbodyState(); };
        RigidbodyPhysics.prototype.destroy = function () { this.destroyRigidbodyState(); };
        /////////////////////////////////////////////////
        // Protected Rigidbody Physics State Functions //
        /////////////////////////////////////////////////
        RigidbodyPhysics.prototype.awakeRigidbodyState = function () {
            this._abstractMesh = this.getAbstractMesh();
            this._isKinematic = this.getProperty("isKinematic", this._isKinematic);
            this.m_physicsWorld = BABYLON.SceneManager.GetPhysicsWorld(this.scene);
            this.m_physicsEngine = BABYLON.SceneManager.GetPhysicsEngine(this.scene);
            if (this.transform.metadata != null && this.transform.metadata.unity != null && this.transform.metadata.unity.physics != null) {
                this._centerOfMass = (this.transform.metadata.unity.physics.center != null) ? BABYLON.Utilities.ParseVector3(this.transform.metadata.unity.physics.center, this._centerOfMass) : this._centerOfMass;
            }
            //console.warn("Starting Rigidbody Physics For: " + this.transform.name);
            this.setMaxNotifications(this._maxCollisions);
            BABYLON.Utilities.ValidateTransformQuaternion(this.transform);
            this._isPhysicsReady = (this.m_physicsEngine != null && this._tmpCollisionContacts != null && this._abstractMesh != null && this._abstractMesh.physicsImpostor != null && this._abstractMesh.physicsImpostor.physicsBody != null);
            var collisionGroup = (this._isKinematic === true) ? BABYLON.CollisionFilters.StaticFilter : BABYLON.CollisionFilters.DefaultFilter;
            var collisionMask = (this._isKinematic === true) ? BABYLON.CollisionFilters.AllFilter ^ BABYLON.CollisionFilters.StaticFilter : BABYLON.CollisionFilters.AllFilter;
            // DEPRECIATED: this.setContactProcessingThreshold(0);
            this.setCollisionFilterGroup(collisionGroup);
            this.setCollisionFilterMask(collisionMask);
            this.resetBodyCollisionContacts();
        };
        RigidbodyPhysics.prototype.updateRigidbodyState = function () {
            this.syncronizeVehicleController();
        };
        RigidbodyPhysics.prototype.afterRigidbodyState = function () {
            this.parseBodyCollisionContacts();
            this.resetBodyCollisionContacts();
        };
        RigidbodyPhysics.prototype.destroyRigidbodyState = function () {
            this.m_physicsWorld = null;
            this.m_physicsEngine = null;
            if (this.m_raycastVehicle != null) {
                if (this.m_raycastVehicle.dispose) {
                    this.m_raycastVehicle.dispose();
                }
                this.m_raycastVehicle = null;
            }
            if (this._tmpGravityVector != null) {
                Ammo.destroy(this._tmpGravityVector); // ???
                this._tmpGravityVector = null;
            }
            this.onCollisionEnterObservable.clear();
            this.onCollisionEnterObservable = null;
            this.onCollisionStayObservable.clear();
            this.onCollisionStayObservable = null;
            this.onCollisionExitObservable.clear();
            this.onCollisionExitObservable = null;
            this._tmpCollisionContacts = null;
            this._abstractMesh = null;
        };
        //////////////////////////////////////////////////
        // Rigidbody Physics Life Cycle Event Functions //
        //////////////////////////////////////////////////
        RigidbodyPhysics.prototype.syncronizeVehicleController = function () {
            if (this.m_raycastVehicle != null) {
                if (this.m_raycastVehicle.updateWheelInformation) {
                    this.m_raycastVehicle.updateWheelInformation();
                }
            }
        };
        RigidbodyPhysics.prototype.parseBodyCollisionContacts = function () {
            if (this._isPhysicsReady === true) {
                var hasEnterObservers = this.onCollisionEnterObservable.hasObservers();
                var hasStayObservers = this.onCollisionStayObservable.hasObservers();
                var hasExitObservers = this.onCollisionExitObservable.hasObservers();
                if (hasEnterObservers || hasStayObservers || hasExitObservers) {
                    var index = 0; // Note: Flag All Collision List Items For End Contact State
                    for (index = 0; index < this._tmpCollisionContacts.length; index++) {
                        this._tmpCollisionContacts[index].reset = true;
                    }
                    // ..
                    // Parse Overlapping Body Contact Objects
                    // ..
                    var collisionCount = 0;
                    if (this._abstractMesh.physicsImpostor.tmpCollisionObjects != null) {
                        var tmpCollisionObjectMap = this._abstractMesh.physicsImpostor.tmpCollisionObjects;
                        for (var contactKey in tmpCollisionObjectMap) {
                            var foundindex = -1;
                            var contactMesh = tmpCollisionObjectMap[contactKey];
                            for (index = 0; index < this._tmpCollisionContacts.length; index++) {
                                var check = this._tmpCollisionContacts[index];
                                if (check.mesh != null && check.mesh === contactMesh) {
                                    check.state = 1;
                                    check.reset = false;
                                    foundindex = index;
                                    break;
                                }
                            }
                            if (foundindex === -1) {
                                for (index = 0; index < this._tmpCollisionContacts.length; index++) {
                                    var insert = this._tmpCollisionContacts[index];
                                    if (insert.mesh == null) {
                                        insert.mesh = contactMesh;
                                        insert.state = 0;
                                        insert.reset = false;
                                        break;
                                    }
                                }
                            }
                            collisionCount++;
                            if (collisionCount > this._maxCollisions)
                                break;
                        }
                    }
                    // ..
                    // Dispatch Body Collision Contact State
                    // ..
                    for (index = 0; index < this._tmpCollisionContacts.length; index++) {
                        var info = this._tmpCollisionContacts[index];
                        if (info.reset === true) {
                            // Dispatch On Collision Exit Event
                            if (hasExitObservers && info.mesh != null) {
                                this.onCollisionExitObservable.notifyObservers(info.mesh);
                            }
                            // Reset Collision Contact Info Item
                            info.mesh = null;
                            info.state = 0;
                            info.reset = false;
                        }
                        else {
                            if (info.state === 0) {
                                // Dispatch On Collision Enter Event
                                if (hasEnterObservers && info.mesh != null) {
                                    this.onCollisionEnterObservable.notifyObservers(info.mesh);
                                }
                            }
                            else {
                                // Dispatch On Collision Stay Event
                                if (hasStayObservers && info.mesh != null) {
                                    this.onCollisionStayObservable.notifyObservers(info.mesh);
                                }
                            }
                        }
                    }
                }
            }
        };
        RigidbodyPhysics.prototype.resetBodyCollisionContacts = function () {
            if (this._isPhysicsReady === true) {
                var hasEnterObservers = this.onCollisionEnterObservable.hasObservers();
                var hasStayObservers = this.onCollisionStayObservable.hasObservers();
                var hasExitObservers = this.onCollisionExitObservable.hasObservers();
                if (hasEnterObservers || hasStayObservers || hasExitObservers) {
                    this._abstractMesh.physicsImpostor.tmpCollisionObjects = {};
                }
                else {
                    this._abstractMesh.physicsImpostor.tmpCollisionObjects = null;
                }
            }
        };
        ////////////////////////////////////////////////////////////////////////////////////
        // Rigidbody Physics Gravity Advanced Helper Functions
        ////////////////////////////////////////////////////////////////////////////////////
        /** Sets entity gravity value using physics impostor body. */
        RigidbodyPhysics.prototype.setGravity = function (gravity) {
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null && this._abstractMesh.physicsImpostor.physicsBody != null && this._abstractMesh.physicsImpostor.physicsBody.setGravity) {
                if (gravity != null) {
                    if (this._tmpGravityVector == null)
                        this._tmpGravityVector = new Ammo.btVector3(0, 0, 0);
                    this._tmpGravityVector.setValue(gravity.x, gravity.y, gravity.z);
                    this._abstractMesh.physicsImpostor.physicsBody.setGravity(this._tmpGravityVector);
                }
            }
        };
        /** Gets entity gravity value using physics impostor body. */
        RigidbodyPhysics.prototype.getGravity = function () {
            var result = new BABYLON.Vector3(0, 0, 0);
            this.getGravityToRef(result);
            return result;
        };
        /** Gets entity gravity value using physics impostor body. */
        RigidbodyPhysics.prototype.getGravityToRef = function (result) {
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null && this._abstractMesh.physicsImpostor.physicsBody != null && this._abstractMesh.physicsImpostor.physicsBody.getGravity) {
                var gravity = this._abstractMesh.physicsImpostor.physicsBody.getGravity();
                BABYLON.Utilities.ConvertAmmoVector3ToRef(gravity, result);
            }
        };
        ////////////////////////////////////////////////////////////////////////////////////
        // Rigidbody Physics Impostor Helper Functions -  TODO - Use Native Physics API - ???
        ////////////////////////////////////////////////////////////////////////////////////
        /** Gets mass of entity using physics impostor. */
        RigidbodyPhysics.prototype.getMass = function () {
            var result = 0;
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null) {
                result = this._abstractMesh.physicsImpostor.mass;
            }
            return result;
        };
        /** Sets mass to entity using physics impostor. */
        RigidbodyPhysics.prototype.setMass = function (mass) {
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null) {
                if (this._abstractMesh.physicsImpostor.mass !== mass) {
                    this._abstractMesh.physicsImpostor.mass = mass;
                }
            }
        };
        /** Gets entity friction level using physics impostor. */
        RigidbodyPhysics.prototype.getFriction = function () {
            var result = 0;
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null) {
                result = this._abstractMesh.physicsImpostor.friction;
            }
            return result;
        };
        /** Applies friction to entity using physics impostor. */
        RigidbodyPhysics.prototype.setFriction = function (friction) {
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null) {
                if (this._abstractMesh.physicsImpostor.friction !== friction) {
                    this._abstractMesh.physicsImpostor.friction = friction;
                }
            }
        };
        /** Gets restitution of entity using physics impostor. */
        RigidbodyPhysics.prototype.getRestitution = function () {
            var result = 0;
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null) {
                result = this._abstractMesh.physicsImpostor.restitution;
            }
            return result;
        };
        /** Sets restitution to entity using physics impostor. */
        RigidbodyPhysics.prototype.setRestitution = function (restitution) {
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null) {
                if (this._abstractMesh.physicsImpostor.restitution !== restitution) {
                    this._abstractMesh.physicsImpostor.restitution = restitution;
                }
            }
        };
        /** Gets entity linear velocity using physics impostor. */
        RigidbodyPhysics.prototype.getLinearVelocity = function () {
            var result = null;
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null) {
                result = this._abstractMesh.physicsImpostor.getLinearVelocity();
            }
            return result;
        };
        /** Sets entity linear velocity using physics impostor. */
        RigidbodyPhysics.prototype.setLinearVelocity = function (velocity) {
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null) {
                if (velocity != null)
                    this._abstractMesh.physicsImpostor.setLinearVelocity(velocity);
            }
        };
        /** Gets entity angular velocity using physics impostor. */
        RigidbodyPhysics.prototype.getAngularVelocity = function () {
            var result = null;
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null) {
                result = this._abstractMesh.physicsImpostor.getAngularVelocity();
            }
            return result;
        };
        /** Sets entity angular velocity using physics impostor. */
        RigidbodyPhysics.prototype.setAngularVelocity = function (velocity) {
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null) {
                if (velocity != null)
                    this._abstractMesh.physicsImpostor.setAngularVelocity(velocity);
            }
        };
        ////////////////////////////////////////////////////////////////////////////////////
        // Rigidbody Physics Transform Helper Functions
        ////////////////////////////////////////////////////////////////////////////////////
        /** Gets the native physics world transform object using physics impostor body. (Advanved Use Only) */
        RigidbodyPhysics.prototype.getWorldTransform = function () {
            var result = null;
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null && this._abstractMesh.physicsImpostor.physicsBody != null) {
                var collisionObject = Ammo.castObject(this._abstractMesh.physicsImpostor.physicsBody, Ammo.btCollisionObject);
                if (collisionObject != null && collisionObject.getWorldTransform) {
                    result = collisionObject.getWorldTransform();
                }
            }
            return result;
        };
        /** Gets the entity world transform position using physics impostor body. (Advanved Use Only) */
        RigidbodyPhysics.prototype.getTransformPositionToRef = function (result) {
            var btTransform = this.getWorldTransform();
            if (btTransform != null && result != null) {
                var btPosition = btTransform.getOrigin();
                BABYLON.Utilities.ConvertAmmoVector3ToRef(btPosition, result);
            }
        };
        /** Gets the entity world transform rotation using physics impostor body. (Advanved Use Only) */
        RigidbodyPhysics.prototype.getTransformRotationToRef = function (result) {
            var btTransform = this.getWorldTransform();
            if (btTransform != null && result != null) {
                var btRotation = btTransform.getRotation();
                BABYLON.Utilities.ConvertAmmoQuaternionToRef(btRotation, result);
            }
        };
        ////////////////////////////////////////////////////////////////////////////////////
        // Rigidbody Applied Physics Movement Functions
        ////////////////////////////////////////////////////////////////////////////////////
        RigidbodyPhysics.prototype.clearForces = function () {
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null && this._abstractMesh.physicsImpostor.physicsBody != null && this._abstractMesh.physicsImpostor.physicsBody.clearForces) {
                this._abstractMesh.physicsImpostor.physicsBody.clearForces();
            }
        };
        ////////////////////////////////////////////////// 
        // TODO - Use Function Specific Temp Ammo Buffer //
        ////////////////////////////////////////////////// 
        RigidbodyPhysics.prototype.applyTorque = function (torque) {
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null && this._abstractMesh.physicsImpostor.physicsBody != null && this._abstractMesh.physicsImpostor.physicsBody.applyTorque) {
                if (torque != null) {
                    if (BABYLON.RigidbodyPhysics.TempAmmoVector == null)
                        BABYLON.RigidbodyPhysics.TempAmmoVector = new Ammo.btVector3(0, 0, 0);
                    BABYLON.RigidbodyPhysics.TempAmmoVector.setValue(torque.x, torque.y, torque.z);
                    this._abstractMesh.physicsImpostor.physicsBody.applyTorque(BABYLON.RigidbodyPhysics.TempAmmoVector);
                }
            }
        };
        RigidbodyPhysics.prototype.applyLocalTorque = function (torque) {
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null && this._abstractMesh.physicsImpostor.physicsBody != null && this._abstractMesh.physicsImpostor.physicsBody.applyLocalTorque) {
                if (torque != null) {
                    if (BABYLON.RigidbodyPhysics.TempAmmoVector == null)
                        BABYLON.RigidbodyPhysics.TempAmmoVector = new Ammo.btVector3(0, 0, 0);
                    BABYLON.RigidbodyPhysics.TempAmmoVector.setValue(torque.x, torque.y, torque.z);
                    this._abstractMesh.physicsImpostor.physicsBody.applyLocalTorque(BABYLON.RigidbodyPhysics.TempAmmoVector);
                }
            }
        };
        RigidbodyPhysics.prototype.applyImpulse = function (impulse, rel_pos) {
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null && this._abstractMesh.physicsImpostor.physicsBody != null && this._abstractMesh.physicsImpostor.physicsBody.applyImpulse) {
                if (impulse != null) {
                    if (BABYLON.RigidbodyPhysics.TempAmmoVector == null)
                        BABYLON.RigidbodyPhysics.TempAmmoVector = new Ammo.btVector3(0, 0, 0);
                    if (BABYLON.RigidbodyPhysics.TempAmmoVectorAux == null)
                        BABYLON.RigidbodyPhysics.TempAmmoVectorAux = new Ammo.btVector3(0, 0, 0);
                    BABYLON.RigidbodyPhysics.TempAmmoVector.setValue(impulse.x, impulse.y, impulse.z);
                    BABYLON.RigidbodyPhysics.TempAmmoVectorAux.setValue(rel_pos.x, rel_pos.y, rel_pos.z);
                    this._abstractMesh.physicsImpostor.physicsBody.applyImpulse(BABYLON.RigidbodyPhysics.TempAmmoVector, BABYLON.RigidbodyPhysics.TempAmmoVectorAux);
                }
            }
        };
        RigidbodyPhysics.prototype.applyCentralImpulse = function (impulse) {
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null && this._abstractMesh.physicsImpostor.physicsBody != null && this._abstractMesh.physicsImpostor.physicsBody.applyCentralImpulse) {
                if (impulse != null) {
                    if (BABYLON.RigidbodyPhysics.TempAmmoVector == null)
                        BABYLON.RigidbodyPhysics.TempAmmoVector = new Ammo.btVector3(0, 0, 0);
                    BABYLON.RigidbodyPhysics.TempAmmoVector.setValue(impulse.x, impulse.y, impulse.z);
                    this._abstractMesh.physicsImpostor.physicsBody.applyCentralImpulse(BABYLON.RigidbodyPhysics.TempAmmoVector);
                }
            }
        };
        RigidbodyPhysics.prototype.applyTorqueImpulse = function (torque) {
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null && this._abstractMesh.physicsImpostor.physicsBody != null && this._abstractMesh.physicsImpostor.physicsBody.applyTorqueImpulse) {
                if (torque != null) {
                    if (BABYLON.RigidbodyPhysics.TempAmmoVector == null)
                        BABYLON.RigidbodyPhysics.TempAmmoVector = new Ammo.btVector3(0, 0, 0);
                    BABYLON.RigidbodyPhysics.TempAmmoVector.setValue(torque.x, torque.y, torque.z);
                    this._abstractMesh.physicsImpostor.physicsBody.applyTorqueImpulse(BABYLON.RigidbodyPhysics.TempAmmoVector);
                }
            }
        };
        RigidbodyPhysics.prototype.applyForce = function (force, rel_pos) {
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null && this._abstractMesh.physicsImpostor.physicsBody != null && this._abstractMesh.physicsImpostor.physicsBody.applyForce) {
                if (force != null) {
                    if (BABYLON.RigidbodyPhysics.TempAmmoVector == null)
                        BABYLON.RigidbodyPhysics.TempAmmoVector = new Ammo.btVector3(0, 0, 0);
                    if (BABYLON.RigidbodyPhysics.TempAmmoVectorAux == null)
                        BABYLON.RigidbodyPhysics.TempAmmoVectorAux = new Ammo.btVector3(0, 0, 0);
                    BABYLON.RigidbodyPhysics.TempAmmoVector.setValue(force.x, force.y, force.z);
                    BABYLON.RigidbodyPhysics.TempAmmoVectorAux.setValue(rel_pos.x, rel_pos.y, rel_pos.z);
                    this._abstractMesh.physicsImpostor.physicsBody.applyForce(BABYLON.RigidbodyPhysics.TempAmmoVector, BABYLON.RigidbodyPhysics.TempAmmoVectorAux);
                }
            }
        };
        RigidbodyPhysics.prototype.applyCentralForce = function (force) {
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null && this._abstractMesh.physicsImpostor.physicsBody != null && this._abstractMesh.physicsImpostor.physicsBody.applyCentralForce) {
                if (force != null) {
                    if (BABYLON.RigidbodyPhysics.TempAmmoVector == null)
                        BABYLON.RigidbodyPhysics.TempAmmoVector = new Ammo.btVector3(0, 0, 0);
                    BABYLON.RigidbodyPhysics.TempAmmoVector.setValue(force.x, force.y, force.z);
                    this._abstractMesh.physicsImpostor.physicsBody.applyCentralForce(BABYLON.RigidbodyPhysics.TempAmmoVector);
                }
            }
        };
        RigidbodyPhysics.prototype.applyCentralLocalForce = function (force) {
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null && this._abstractMesh.physicsImpostor.physicsBody != null && this._abstractMesh.physicsImpostor.physicsBody.applyCentralLocalForce) {
                if (force != null) {
                    if (BABYLON.RigidbodyPhysics.TempAmmoVector == null)
                        BABYLON.RigidbodyPhysics.TempAmmoVector = new Ammo.btVector3(0, 0, 0);
                    BABYLON.RigidbodyPhysics.TempAmmoVector.setValue(force.x, force.y, force.z);
                    this._abstractMesh.physicsImpostor.physicsBody.applyCentralLocalForce(BABYLON.RigidbodyPhysics.TempAmmoVector);
                }
            }
        };
        /** gets rigidbody center of mass */
        RigidbodyPhysics.prototype.getCenterOfMassTransform = function () {
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null && this._abstractMesh.physicsImpostor.physicsBody != null && this._abstractMesh.physicsImpostor.physicsBody.getCenterOfMassTransform) {
                var bttransform = this._abstractMesh.physicsImpostor.physicsBody.getCenterOfMassTransform();
                var btposition = bttransform.getOrigin();
                this._tmpCenterOfMass.set(btposition.x(), btposition.y(), btposition.z());
            }
            return this._tmpCenterOfMass;
        };
        /** Sets rigidbody center of mass */
        RigidbodyPhysics.prototype.setCenterOfMassTransform = function (center) {
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null && this._abstractMesh.physicsImpostor.physicsBody != null && this._abstractMesh.physicsImpostor.physicsBody.setCenterOfMassTransform) {
                if (center != null) {
                    if (BABYLON.RigidbodyPhysics.TempAmmoVector == null)
                        BABYLON.RigidbodyPhysics.TempAmmoVector = new Ammo.btVector3(0, 0, 0);
                    BABYLON.RigidbodyPhysics.TempAmmoVector.setValue(center.x, center.y, center.z);
                    if (BABYLON.RigidbodyPhysics.TempCenterTransform == null)
                        BABYLON.RigidbodyPhysics.TempCenterTransform = new Ammo.btTransform();
                    BABYLON.RigidbodyPhysics.TempCenterTransform.setIdentity();
                    BABYLON.RigidbodyPhysics.TempCenterTransform.setOrigin(BABYLON.RigidbodyPhysics.TempAmmoVector);
                    this._abstractMesh.physicsImpostor.physicsBody.setCenterOfMassTransform(BABYLON.RigidbodyPhysics.TempCenterTransform);
                }
            }
        };
        ////////////////////////////////////////////////////////////////////////////////////
        // Rigidbody Physics Native Body Helper Functions
        ////////////////////////////////////////////////////////////////////////////////////
        /** Gets entity linear factor using physics impostor body. */
        RigidbodyPhysics.prototype.getLinearFactor = function () {
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null && this._abstractMesh.physicsImpostor.physicsBody != null && this._abstractMesh.physicsImpostor.physicsBody.getLinearFactor) {
                var linearFactor = this._abstractMesh.physicsImpostor.physicsBody.getLinearFactor();
                this._tmpLinearFactor.set(linearFactor.x(), linearFactor.y(), linearFactor.z());
            }
            return this._tmpLinearFactor;
        };
        /** Sets entity linear factor using physics impostor body. */
        RigidbodyPhysics.prototype.setLinearFactor = function (factor) {
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null && this._abstractMesh.physicsImpostor.physicsBody != null && this._abstractMesh.physicsImpostor.physicsBody.setLinearFactor) {
                if (BABYLON.RigidbodyPhysics.TempAmmoVector == null)
                    BABYLON.RigidbodyPhysics.TempAmmoVector = new Ammo.btVector3(0, 0, 0);
                BABYLON.RigidbodyPhysics.TempAmmoVector.setValue(factor.x, factor.y, factor.z);
                this._abstractMesh.physicsImpostor.physicsBody.setLinearFactor(BABYLON.RigidbodyPhysics.TempAmmoVector);
            }
        };
        /** Gets entity angular factor using physics impostor body. */
        RigidbodyPhysics.prototype.getAngularFactor = function () {
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null && this._abstractMesh.physicsImpostor.physicsBody != null && this._abstractMesh.physicsImpostor.physicsBody.getAngularFactor) {
                var angularFactor = this._abstractMesh.physicsImpostor.physicsBody.getAngularFactor();
                this._tmpAngularFactor.set(angularFactor.x(), angularFactor.y(), angularFactor.z());
            }
            return this._tmpAngularFactor;
        };
        /** Sets entity angular factor using physics impostor body. */
        RigidbodyPhysics.prototype.setAngularFactor = function (factor) {
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null && this._abstractMesh.physicsImpostor.physicsBody != null && this._abstractMesh.physicsImpostor.physicsBody.setAngularFactor) {
                if (BABYLON.RigidbodyPhysics.TempAmmoVector == null)
                    BABYLON.RigidbodyPhysics.TempAmmoVector = new Ammo.btVector3(0, 0, 0);
                BABYLON.RigidbodyPhysics.TempAmmoVector.setValue(factor.x, factor.y, factor.z);
                this._abstractMesh.physicsImpostor.physicsBody.setAngularFactor(BABYLON.RigidbodyPhysics.TempAmmoVector);
            }
        };
        /** Gets entity angular damping using physics impostor body. */
        RigidbodyPhysics.prototype.getAngularDamping = function () {
            var result = 0;
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null && this._abstractMesh.physicsImpostor.physicsBody != null && this._abstractMesh.physicsImpostor.physicsBody.getAngularDamping) {
                result = this._abstractMesh.physicsImpostor.physicsBody.getAngularDamping();
            }
            return result;
        };
        /** Gets entity linear damping using physics impostor body. */
        RigidbodyPhysics.prototype.getLinearDamping = function () {
            var result = 0;
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null && this._abstractMesh.physicsImpostor.physicsBody != null && this._abstractMesh.physicsImpostor.physicsBody.getLinearDamping) {
                result = this._abstractMesh.physicsImpostor.physicsBody.getLinearDamping();
            }
            return result;
        };
        /** Sets entity drag damping using physics impostor body. */
        RigidbodyPhysics.prototype.setDamping = function (linear, angular) {
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null && this._abstractMesh.physicsImpostor.physicsBody != null && this._abstractMesh.physicsImpostor.physicsBody.setDamping) {
                this._abstractMesh.physicsImpostor.physicsBody.setDamping(linear, angular);
            }
        };
        /** Sets entity sleeping threshold using physics impostor body. */
        RigidbodyPhysics.prototype.setSleepingThresholds = function (linear, angular) {
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null && this._abstractMesh.physicsImpostor.physicsBody != null && this._abstractMesh.physicsImpostor.physicsBody.setSleepingThresholds) {
                this._abstractMesh.physicsImpostor.physicsBody.setSleepingThresholds(linear, angular);
            }
        };
        ////////////////////////////////////////////////////////////////////////////////////
        // Rigidbody Physics Native Advanced Helper Functions
        ////////////////////////////////////////////////////////////////////////////////////
        /** Checks if rigidbody has wheel collider metadata for the entity. Note: Wheel collider metadata informaion is required for vehicle control. */
        RigidbodyPhysics.prototype.hasWheelColliders = function () {
            return (this._isPhysicsReady === true && this._abstractMesh.metadata != null && this._abstractMesh.metadata.unity != null && this._abstractMesh.metadata.unity.wheels != null);
        };
        /** Sets the maximum number of simultaneous contact notfications to dispatch per frame. Defaults value is 4. (Advanved Use Only) */
        RigidbodyPhysics.prototype.setMaxNotifications = function (max) {
            this._maxCollisions = max;
            this._tmpCollisionContacts = [];
            for (var index = 0; index < this._maxCollisions; index++) {
                this._tmpCollisionContacts.push(new CollisionContactInfo());
            }
        };
        /** Sets entity collision activation state using physics impostor body. (Advanved Use Only) */
        RigidbodyPhysics.prototype.setActivationState = function (state) {
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null && this._abstractMesh.physicsImpostor.physicsBody != null) {
                var collisionObject = Ammo.castObject(this._abstractMesh.physicsImpostor.physicsBody, Ammo.btCollisionObject);
                if (collisionObject != null && collisionObject.setActivationState) {
                    collisionObject.setActivationState(state);
                }
            }
        };
        /** Gets entity collision filter group using physics impostor body. (Advanved Use Only) */
        RigidbodyPhysics.prototype.getCollisionFilterGroup = function () {
            var result = -1;
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null && this._abstractMesh.physicsImpostor.physicsBody != null && this._abstractMesh.physicsImpostor.physicsBody.getBroadphaseProxy) {
                result = this._abstractMesh.physicsImpostor.physicsBody.getBroadphaseProxy().get_m_collisionFilterGroup();
            }
            return result;
        };
        /** Sets entity collision filter group using physics impostor body. (Advanved Use Only) */
        RigidbodyPhysics.prototype.setCollisionFilterGroup = function (group) {
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null && this._abstractMesh.physicsImpostor.physicsBody != null && this._abstractMesh.physicsImpostor.physicsBody.getBroadphaseProxy) {
                this._abstractMesh.physicsImpostor.physicsBody.getBroadphaseProxy().set_m_collisionFilterGroup(group);
            }
        };
        /** Gets entity collision filter mask using physics impostor body. (Advanved Use Only) */
        RigidbodyPhysics.prototype.getCollisionFilterMask = function () {
            var result = -1;
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null && this._abstractMesh.physicsImpostor.physicsBody != null && this._abstractMesh.physicsImpostor.physicsBody.getBroadphaseProxy) {
                result = this._abstractMesh.physicsImpostor.physicsBody.getBroadphaseProxy().get_m_collisionFilterMask();
            }
            return result;
        };
        /** Sets entity collision filter mask using physics impostor body. (Advanved Use Only) */
        RigidbodyPhysics.prototype.setCollisionFilterMask = function (mask) {
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null && this._abstractMesh.physicsImpostor.physicsBody != null && this._abstractMesh.physicsImpostor.physicsBody.getBroadphaseProxy) {
                this._abstractMesh.physicsImpostor.physicsBody.getBroadphaseProxy().set_m_collisionFilterMask(mask);
            }
        };
        /** Gets the entity collision shape type using physics impostor body. (Advanved Use Only) */
        RigidbodyPhysics.prototype.getCollisionShapeType = function () {
            var result = -1;
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null && this._abstractMesh.physicsImpostor.physicsBody != null) {
                var collisionObject = Ammo.castObject(this._abstractMesh.physicsImpostor.physicsBody, Ammo.btCollisionObject);
                if (collisionObject != null) {
                    var collisionShape = collisionObject.getCollisionShape();
                    if (collisionShape != null && collisionShape.getShapeType) {
                        result = collisionShape.getShapeType();
                    }
                }
            }
            return result;
        };
        /** Gets the entity collision shape margin using physics impostor body. (Advanved Use Only) */
        RigidbodyPhysics.prototype.getCollisionShapeMargin = function () {
            var result = -1;
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null && this._abstractMesh.physicsImpostor.physicsBody != null) {
                var collisionObject = Ammo.castObject(this._abstractMesh.physicsImpostor.physicsBody, Ammo.btCollisionObject);
                if (collisionObject != null) {
                    var collisionShape = collisionObject.getCollisionShape();
                    if (collisionShape != null && collisionShape.getMargin) {
                        result = collisionShape.getMargin();
                    }
                }
            }
            return result;
        };
        /** Sets entity collision shape margin using physics impostor body. (Advanved Use Only) */
        RigidbodyPhysics.prototype.setCollisionShapeMargin = function (margin) {
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null && this._abstractMesh.physicsImpostor.physicsBody != null) {
                var collisionObject = Ammo.castObject(this._abstractMesh.physicsImpostor.physicsBody, Ammo.btCollisionObject);
                if (collisionObject != null) {
                    var collisionShape = collisionObject.getCollisionShape();
                    if (collisionShape != null && collisionShape.setMargin) {
                        collisionShape.setMargin(margin);
                    }
                }
            }
        };
        /** Gets the entity contact processing threshold using physics impostor body. (Advanved Use Only) */
        RigidbodyPhysics.prototype.getContactProcessingThreshold = function () {
            var result = -1;
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null && this._abstractMesh.physicsImpostor.physicsBody != null) {
                var collisionObject = Ammo.castObject(this._abstractMesh.physicsImpostor.physicsBody, Ammo.btCollisionObject);
                if (collisionObject != null && collisionObject.getContactProcessingThreshold) {
                    result = collisionObject.getContactProcessingThreshold();
                }
            }
            return result;
        };
        /** Sets entity contact processing threshold using physics impostor body. (Advanved Use Only) */
        RigidbodyPhysics.prototype.setContactProcessingThreshold = function (threshold) {
            if (this._abstractMesh != null && this._abstractMesh.physicsImpostor != null && this._abstractMesh.physicsImpostor.physicsBody != null) {
                var collisionObject = Ammo.castObject(this._abstractMesh.physicsImpostor.physicsBody, Ammo.btCollisionObject);
                if (collisionObject != null && collisionObject.setContactProcessingThreshold) {
                    collisionObject.setContactProcessingThreshold(threshold);
                }
            }
        };
        // ************************************ //
        // * Physics Physics Helper Functions * //
        // ************************************ //
        /** TODO */
        RigidbodyPhysics.CreatePhysicsMetadata = function (mass, drag, angularDrag, centerMass) {
            if (drag === void 0) { drag = 0.0; }
            if (angularDrag === void 0) { angularDrag = 0.05; }
            if (centerMass === void 0) { centerMass = null; }
            var center = (centerMass != null) ? centerMass : new BABYLON.Vector3(0, 0, 0);
            return {
                "type": "rigidbody",
                "mass": mass,
                "ldrag": drag,
                "adrag": angularDrag,
                "center": {
                    "x": center.x,
                    "y": center.y,
                    "z": center.z
                }
            };
        };
        /** TODO */
        RigidbodyPhysics.CreateCollisionMetadata = function (type, trigger, convexmesh, restitution, dynamicfriction, staticfriction) {
            if (trigger === void 0) { trigger = false; }
            if (convexmesh === void 0) { convexmesh = false; }
            if (restitution === void 0) { restitution = 0.0; }
            if (dynamicfriction === void 0) { dynamicfriction = 0.6; }
            if (staticfriction === void 0) { staticfriction = 0.6; }
            return {
                "type": type,
                "trigger": trigger,
                "convexmesh": convexmesh,
                "restitution": restitution,
                "dynamicfriction": dynamicfriction,
                "staticfriction": staticfriction,
                "wheelinformation": null
            };
        };
        /** TODO */
        RigidbodyPhysics.CreatePhysicsProperties = function (mass, drag, angularDrag, useGravity, isKinematic) {
            if (drag === void 0) { drag = 0.0; }
            if (angularDrag === void 0) { angularDrag = 0.05; }
            if (useGravity === void 0) { useGravity = true; }
            if (isKinematic === void 0) { isKinematic = false; }
            return {
                "mass": mass,
                "drag": drag,
                "angularDrag": angularDrag,
                "useGravity": useGravity,
                "isKinematic": isKinematic
            };
        };
        /** TODO */
        RigidbodyPhysics.SetupPhysicsComponent = function (scene, entity) {
            // console.warn(">>> TRACE - Setup Physics For: " + entity.name);
            // console.log(entity);
            var metadata = (entity.metadata != null && entity.metadata.unity != null) ? entity.metadata.unity : null;
            if (metadata != null && (metadata.physics != null || metadata.collision != null)) {
                // Physics Metadata
                var hasphysics = (metadata.physics != null);
                var isroot = (metadata.physics != null && metadata.physics.root != null) ? metadata.physics.root : false;
                var mass = (metadata.physics != null && metadata.physics.mass != null) ? metadata.physics.mass : 0;
                var isstatic = (mass === 0);
                // Collision Metadata
                var hascollision = (metadata.collision != null);
                var collider = (metadata.collision != null && metadata.collision.type != null) ? metadata.collision.type : "BoxCollider";
                var convexmesh = (metadata.collision != null && metadata.collision.convexmesh != null) ? metadata.collision.convexmesh : false;
                var dynamicfriction = (metadata.collision != null && metadata.collision.dynamicfriction != null) ? metadata.collision.dynamicfriction : 0.6;
                var staticfriction = (metadata.collision != null && metadata.collision.staticfriction != null) ? metadata.collision.staticfriction : 0.6;
                var restitution = (metadata.collision != null && metadata.collision.restitution != null) ? metadata.collision.restitution : 0;
                var istrigger = (metadata.collision != null && metadata.collision.trigger != null) ? metadata.collision.trigger : false;
                var impostortype = BABYLON.PhysicsImpostor.BoxImpostor;
                // Config Physics Impostor
                if (collider === "MeshCollider") {
                    impostortype = (convexmesh === true) ? BABYLON.PhysicsImpostor.ConvexHullImpostor : BABYLON.PhysicsImpostor.MeshImpostor;
                }
                else if (collider === "CapsuleCollider") {
                    impostortype = BABYLON.PhysicsImpostor.CapsuleImpostor;
                }
                else if (collider === "SphereCollider") {
                    impostortype = BABYLON.PhysicsImpostor.SphereImpostor;
                }
                else {
                    impostortype = BABYLON.PhysicsImpostor.BoxImpostor;
                }
                // Create Physics Impostor Node
                if (hasphysics === true) {
                    if (isroot) {
                        // const center:BABYLON.Vector3 = (metadata.physics != null && metadata.physics.center != null) ? BABYLON.Utilities.ParseVector3(metadata.physics.center, BABYLON.Vector3.Zero()) : BABYLON.Vector3.Zero();
                        var fnodes_1 = null;
                        var fwheels_1 = null;
                        var childnodes = entity.getChildren(null, false);
                        if (childnodes != null && childnodes.length > 0) {
                            childnodes.forEach(function (childnode) {
                                if (childnode.metadata != null && childnode.metadata.unity != null) {
                                    if (childnode.metadata.unity.collision != null) {
                                        var ccollision = childnode.metadata.unity.collision;
                                        var cwheelinformation = (ccollision.wheelinformation != null) ? ccollision.wheelinformation : null;
                                        if (cwheelinformation != null) {
                                            // Trace Wheel Collider
                                            // BABYLON.Tools.Warn("Push raycast wheel collider: " + childnode.name + " --> on to: " + entity.name);
                                            if (fwheels_1 == null)
                                                fwheels_1 = [];
                                            fwheels_1.push(cwheelinformation);
                                        }
                                        else {
                                            // Trace Compound Collider
                                            // BABYLON.Tools.Warn("Push compound child collider: " + childnode.name + " --> on to: " + entity.name);
                                            if (fnodes_1 == null)
                                                fnodes_1 = [];
                                            fnodes_1.push(childnode);
                                        }
                                    }
                                }
                            });
                        }
                        if (fwheels_1 != null && fwheels_1.length > 0) {
                            if (entity.metadata == null)
                                entity.metadata = {};
                            if (entity.metadata.unity == null)
                                entity.metadata.unity = {};
                            entity.metadata.unity.wheels = fwheels_1;
                        }
                        if (fnodes_1 != null && fnodes_1.length > 0) {
                            if (hascollision === true)
                                fnodes_1.unshift(entity);
                            entity._compoundNodes = fnodes_1;
                            // Trace Physics Root
                            // BABYLON.Tools.Warn("Setup physics root imposter for: " + entity.name);
                            BABYLON.SceneManager.CreatePhysicsImpostor(scene, entity, BABYLON.PhysicsImpostor.NoImpostor, { mass: mass, friction: dynamicfriction, restitution: restitution });
                            BABYLON.RigidbodyPhysics.ConfigRigidbodyPhysics(scene, entity, false, istrigger, metadata.physics);
                        }
                        childnodes = null;
                    }
                    else {
                        if (hascollision === true) {
                            // Trace Physics Impostor
                            //BABYLON.Tools.Warn("Setup " + BABYLON.SceneManager.GetPhysicsImposterType(impostortype).toLowerCase() + " physics impostor for: " + entity.name);
                            BABYLON.SceneManager.CreatePhysicsImpostor(scene, entity, impostortype, { mass: mass, friction: (isstatic) ? staticfriction : dynamicfriction, restitution: restitution });
                            BABYLON.RigidbodyPhysics.ConfigRigidbodyPhysics(scene, entity, false, istrigger, metadata.physics);
                        }
                    }
                }
            }
        };
        /* DEPRECIATED
        public static SetupPhysicsComponent_LEGACY(scene:BABYLON.Scene, entity: BABYLON.AbstractMesh): void {
            // BABYLON.Tools.Warn("Setup Physics Component For: " + entity.name);
            const metadata:any = (entity.metadata != null && entity.metadata.unity != null) ? entity.metadata.unity : null;
            if (metadata != null && metadata.physics != null) {
                const mass:number = (metadata.physics.mass != null) ? metadata.physics.mass : 0;
                const center:BABYLON.Vector3 = (metadata.physics.center != null) ? BABYLON.Utilities.ParseVector3(metadata.physics.center, BABYLON.Vector3.Zero()) : BABYLON.Vector3.Zero();
                if (metadata.physics.type === "rigidbody") {
                    if (metadata.collision != null && metadata.collision.type != null) {
                        // ..
                        // Setup Convex Hull & Mesh Impostor Colliders
                        // ..
                        const convexmesh:boolean = (metadata.collision.convexmesh != null) ? metadata.collision.convexmesh : false;
                        const dynamicfriction:number = (metadata.collision.dynamicfriction != null) ? metadata.collision.dynamicfriction : 0.6;
                        const staticfriction:number = (metadata.collision.staticfriction != null) ? metadata.collision.staticfriction : 0.6;
                        const restitution:number = (metadata.collision.restitution != null) ? metadata.collision.restitution : 0;
                        const impersonate:string = (metadata.collision.impersonate != null) ? metadata.collision.impersonate : "None";
                        const istrigger:boolean = (metadata.collision.trigger != null) ? metadata.collision.trigger : false;
                        const collider:string = (metadata.collision.type != null) ? metadata.collision.type : "BoxCollider";
                        let impostortype:number = BABYLON.PhysicsImpostor.BoxImpostor;
                        if (impersonate == null || impersonate === "" || impersonate === "None") {
                            if (collider === "MeshCollider") {
                                impostortype = (convexmesh === true) ? BABYLON.PhysicsImpostor.ConvexHullImpostor : BABYLON.PhysicsImpostor.MeshImpostor;
                                if (mass > 0 && convexmesh === false) BABYLON.Tools.Warn("Non static mesh collider not supported for transform node: " + entity.name);
                            } else if (collider === "CapsuleCollider") {
                                // Note: Using Convex Hull Impostor To Support Capsule Rotation
                                impostortype = BABYLON.PhysicsImpostor.ConvexHullImpostor;
                            } else if (collider === "SphereCollider") {
                                impostortype = BABYLON.PhysicsImpostor.SphereImpostor;
                            } else {
                                impostortype = BABYLON.PhysicsImpostor.BoxImpostor;
                            }
                        } else {
                            if (impersonate === "PlaneImpostor") {
                                impostortype = BABYLON.PhysicsImpostor.PlaneImpostor;
                            } else if (impersonate === "SphereImpostor") {
                                impostortype = BABYLON.PhysicsImpostor.SphereImpostor;
                            } else if (impersonate === "CapsuleImpostor") {
                                impostortype = BABYLON.PhysicsImpostor.CapsuleImpostor;
                            } else if (impersonate === "CylinderImpostor") {
                                impostortype = BABYLON.PhysicsImpostor.CylinderImpostor;
                            } else if (impersonate === "ConvexHullImpostor") {
                                impostortype = BABYLON.PhysicsImpostor.ConvexHullImpostor;
                            } else {
                                impostortype = BABYLON.PhysicsImpostor.BoxImpostor;
                            }
                        }
                        // Trace Mesh Collider
                        // BABYLON.Tools.Warn("Setup " + BABYLON.SceneManager.GetPhysicsImposterType(impostortype).toLowerCase() + " geometry imposter for: " + entity.name);
                        BABYLON.SceneManager.CreatePhysicsImpostor(scene, entity, impostortype, { mass: mass, friction: dynamicfriction, restitution: restitution });
                        BABYLON.RigidbodyPhysics.ConfigRigidbodyPhysics(scene, entity, false, istrigger, metadata.physics);
                    } else {
                        // ..
                        // Setup Primitive Mesh Compound Child Colliders
                        // ..
                        let fdynamicfriction:number = 0;
                        let fstaticfriction:number = 0;
                        let frestitution:number = 0;
                        let ftrigger:boolean = false;
                        let fcount:number = 0;
                        let fwheels:any[] = null;
                        // Note: Bullet Physics Center Mass Must Offset Meshes (No Working Set Center Mass Property Support)
                        let centernodes:BABYLON.TransformNode[] = entity.getChildren(null, true) as BABYLON.TransformNode[];
                        if (centernodes != null && centernodes.length > 0) {
                            centernodes.forEach((centernode:BABYLON.AbstractMesh) => { centernode.position.subtractInPlace(center); });
                        }
                        let childnodes:BABYLON.AbstractMesh[] = entity.getChildren(null, false) as BABYLON.AbstractMesh[];
                        if (childnodes != null && childnodes.length > 0) {
                            childnodes.forEach((childnode:BABYLON.AbstractMesh) => {
                                if (childnode.metadata != null && childnode.metadata.unity != null) {
                                    if (childnode.metadata.unity.collision != null) {
                                        const collision:any = childnode.metadata.unity.collision;
                                        const cwheelinformation:any = (collision.wheelinformation != null) ? collision.wheelinformation : null;
                                        if (cwheelinformation != null) {
                                            // Trace Wheel Collider
                                            // BABYLON.Tools.Warn("Setup raycast wheel collider for: " + childnode.name);
                                            if (fwheels == null) fwheels = [];
                                            fwheels.push(cwheelinformation);
                                        } else {
                                            // DEPRECIATED: Move All Compound Colliders Un Main No Imposter
                                            // if (childnode.parent !== entity) childnode.setParent(entity); // Nested Compound Colliders
                                            const cdynamicfriction:number = (collision.dynamicfriction != null) ? collision.dynamicfriction : 0.6;
                                            const cstaticfriction:number = (collision.staticfriction != null) ? collision.staticfriction : 0.6;
                                            const crestitution:number = (collision.restitution != null) ? collision.restitution : 0;
                                            const cimpersonate:string = (collision.impersonate != null) ? collision.impersonate : "None";
                                            const cistrigger:boolean = (collision.trigger != null) ? collision.trigger : false;
                                            const ccollider:string = (collision.type != null) ? collision.type : "BoxCollider";
                                            let cimpostortype:number = BABYLON.PhysicsImpostor.BoxImpostor;
                                            if (cimpersonate == null || cimpersonate === "" || cimpersonate === "None") {
                                                if (ccollider === "MeshCollider") {
                                                    // Note: Always Force Convex Hull Impostor Usage
                                                    cimpostortype = BABYLON.PhysicsImpostor.ConvexHullImpostor;
                                                } else if (ccollider === "CapsuleCollider") {
                                                    // Note: Using Convex Hull Impostor To Support Capsule Rotation
                                                    cimpostortype = BABYLON.PhysicsImpostor.ConvexHullImpostor;
                                                } else if (ccollider === "SphereCollider") {
                                                    cimpostortype = BABYLON.PhysicsImpostor.SphereImpostor;
                                                } else {
                                                    cimpostortype = BABYLON.PhysicsImpostor.BoxImpostor;
                                                }
                                            } else {
                                                if (cimpersonate === "PlaneImpostor") {
                                                    cimpostortype = BABYLON.PhysicsImpostor.PlaneImpostor;
                                                } else if (cimpersonate === "SphereImpostor") {
                                                    cimpostortype = BABYLON.PhysicsImpostor.SphereImpostor;
                                                } else if (cimpersonate === "CapsuleImpostor") {
                                                    cimpostortype = BABYLON.PhysicsImpostor.CapsuleImpostor;
                                                } else if (cimpersonate === "CylinderImpostor") {
                                                    cimpostortype = BABYLON.PhysicsImpostor.CylinderImpostor;
                                                } else if (cimpersonate === "ConvexHullImpostor") {
                                                    cimpostortype = BABYLON.PhysicsImpostor.ConvexHullImpostor;
                                                } else {
                                                    cimpostortype = BABYLON.PhysicsImpostor.BoxImpostor;
                                                }
                                            }
                                            if (cdynamicfriction > fdynamicfriction) fdynamicfriction = cdynamicfriction;
                                            if (cstaticfriction > fstaticfriction) fstaticfriction = cstaticfriction;
                                            if (crestitution > frestitution) frestitution = crestitution;
                                            if (cistrigger == true) ftrigger = true;
                                            (<any>childnode)._isCompound = true;
                                            // Trace Compound Collider
                                            // BABYLON.Tools.Warn("Setup " + BABYLON.SceneManager.GetPhysicsImposterType(cimpostortype).toLowerCase() + " compound imposter for: " + childnode.name);
                                            BABYLON.SceneManager.CreatePhysicsImpostor(scene, childnode, cimpostortype, { mass: 0, friction: 0, restitution: 0 });
                                            BABYLON.RigidbodyPhysics.ConfigRigidbodyPhysics(scene, childnode, true, false, metadata.physics);
                                            fcount++;
                                        }
                                    }
                                }
                            });
                        }
                        if (fcount > 0) {
                            (<any>entity)._isRoot = true;
                            // Trace Physics Root
                            // BABYLON.Tools.Warn(">>> Created physics root no imposter for: " + entity.name);
                            BABYLON.SceneManager.CreatePhysicsImpostor(scene, entity, BABYLON.PhysicsImpostor.NoImpostor, { mass: mass, friction: fdynamicfriction, restitution: frestitution });
                            BABYLON.RigidbodyPhysics.ConfigRigidbodyPhysics(scene, entity, false, ftrigger, metadata.physics);
                        }
                        if (fwheels != null && fwheels.length > 0) {
                            if (entity.metadata == null) entity.metadata = {};
                            if (entity.metadata.unity == null) entity.metadata.unity = {};
                            entity.metadata.unity.wheels = fwheels;
                        }
                        childnodes = null;
                    }
                }
            }
        }
        */
        RigidbodyPhysics.ConfigRigidbodyPhysics = function (scene, entity, child, trigger, physics) {
            if (entity == null)
                return;
            if (entity.physicsImpostor != null) {
                entity.physicsImpostor.executeNativeFunction(function (word, body) {
                    if (body.activate)
                        body.activate();
                    var colobj = Ammo.castObject(body, Ammo.btCollisionObject);
                    colobj.entity = entity;
                    // IMPORTANT - Smooth Triangle Mesh Edge Contact Info
                    var world = BABYLON.SceneManager.GetPhysicsWorld(scene);
                    if (world != null && world.generateInternalEdgeInfo) {
                        var collisionShape = colobj.getCollisionShape();
                        if (collisionShape != null && collisionShape.getShapeType) {
                            var shapeType = collisionShape.getShapeType();
                            if (shapeType === 21) { // TRIANGLE_MESH_SHAPE_PROXYTYPE
                                var triangleShape = Ammo.castObject(collisionShape, Ammo.btBvhTriangleMeshShape);
                                colobj.triangleMapInfo = new Ammo.btTriangleInfoMap();
                                world.generateInternalEdgeInfo(triangleShape, colobj.triangleMapInfo);
                            }
                        }
                    }
                    var gravity = (physics != null && physics.gravity != null) ? physics.gravity : true;
                    if (gravity === false) {
                        if (body.setGravity) {
                            body.setGravity(new Ammo.btVector3(0, 0, 0));
                        }
                        else {
                            BABYLON.Tools.Warn("Physics engine set gravity override not supported for: " + entity.name);
                        }
                    }
                    // ..
                    // Setup Drag Damping
                    // ..
                    if (body.setDamping) {
                        var ldrag = (physics != null && physics.ldrag != null) ? physics.ldrag : 0;
                        var adrag = (physics != null && physics.adrag != null) ? physics.adrag : 0.05;
                        body.setDamping(ldrag, adrag);
                    }
                    else {
                        BABYLON.Tools.Warn("Physics engine set drag damping not supported for: " + entity.name);
                    }
                    // ..
                    // Setup Collision Flags
                    // ..
                    if (body.setCollisionFlags && body.getCollisionFlags) {
                        if (trigger === true)
                            body.setCollisionFlags(body.getCollisionFlags() | BABYLON.CollisionFlags.CF_NO_CONTACT_RESPONSE | BABYLON.CollisionFlags.CF_CUSTOM_MATERIAL_CALLBACK);
                        else
                            body.setCollisionFlags(body.getCollisionFlags() | BABYLON.CollisionFlags.CF_CUSTOM_MATERIAL_CALLBACK);
                    }
                    else {
                        BABYLON.Tools.Warn("Physics engine set collision flags not supported for: " + entity.name);
                    }
                    // ..
                    // Setup Freeze Constraints
                    // ..
                    var freeze = (physics != null && physics.freeze != null) ? physics.freeze : null;
                    if (freeze != null) {
                        if (body.setLinearFactor) {
                            var freeze_pos_x = (freeze.positionx != null && freeze.positionx === true) ? 0 : 1;
                            var freeze_pos_y = (freeze.positiony != null && freeze.positiony === true) ? 0 : 1;
                            var freeze_pos_z = (freeze.positionz != null && freeze.positionz === true) ? 0 : 1;
                            body.setLinearFactor(new Ammo.btVector3(freeze_pos_x, freeze_pos_y, freeze_pos_z));
                        }
                        else {
                            BABYLON.Tools.Warn("Physics engine set linear factor not supported for: " + entity.name);
                        }
                        if (body.setAngularFactor) {
                            var freeze_rot_x = (freeze.rotationx != null && freeze.rotationx === true) ? 0 : 1;
                            var freeze_rot_y = (freeze.rotationy != null && freeze.rotationy === true) ? 0 : 1;
                            var freeze_rot_z = (freeze.rotationz != null && freeze.rotationz === true) ? 0 : 1;
                            body.setAngularFactor(new Ammo.btVector3(freeze_rot_x, freeze_rot_y, freeze_rot_z));
                        }
                        else {
                            BABYLON.Tools.Warn("Physics engine set angular factor not supported for: " + entity.name);
                        }
                    }
                });
            }
            else {
                BABYLON.Tools.Warn("No valid physics impostor to setup for " + entity.name);
            }
        };
        RigidbodyPhysics.TempAmmoVector = null;
        RigidbodyPhysics.TempAmmoVectorAux = null;
        RigidbodyPhysics.TempCenterTransform = null;
        return RigidbodyPhysics;
    }(BABYLON.ScriptComponent));
    BABYLON.RigidbodyPhysics = RigidbodyPhysics;
    /**
     * Babylon collision contact info pro class (Native Bullet Physics 2.82)
     * @class CollisionContactInfo - All rights reserved (c) 2020 Mackey Kinard
     */
    var CollisionContactInfo = /** @class */ (function () {
        function CollisionContactInfo() {
            this.mesh = null;
            this.state = 0;
            this.reset = false;
        }
        return CollisionContactInfo;
    }());
    BABYLON.CollisionContactInfo = CollisionContactInfo;
})(BABYLON || (BABYLON = {}));
var BABYLON;
(function (BABYLON) {
    /**
     * Babylon shuriken particle system pro class (Unity Style Shuriken Particle System)
     * @class ShurikenParticles - All rights reserved (c) 2020 Mackey Kinard
     */
    var ShurikenParticles = /** @class */ (function (_super) {
        __extends(ShurikenParticles, _super);
        function ShurikenParticles() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ShurikenParticles.prototype.awake = function () { };
        ShurikenParticles.prototype.start = function () { };
        ShurikenParticles.prototype.update = function () { };
        ShurikenParticles.prototype.late = function () { };
        ShurikenParticles.prototype.after = function () { };
        ShurikenParticles.prototype.destroy = function () { };
        return ShurikenParticles;
    }(BABYLON.ScriptComponent));
    BABYLON.ShurikenParticles = ShurikenParticles;
})(BABYLON || (BABYLON = {}));
var BABYLON;
(function (BABYLON) {
    /**
     * Babylon window socket controller pro class (Socket.IO)
     * @class SocketController - All rights reserved (c) 2020 Mackey Kinard
     */
    var SocketController = /** @class */ (function () {
        function SocketController() {
        }
        /** Registers an handler for window socket connect event */
        SocketController.RegisterOnSocketConnect = function (func) {
            BABYLON.SceneManager.SetWindowState("onSocketConnect", func);
        };
        /** Registers an handler for window socket disconnect event */
        SocketController.RegisterOnSocketDisconnect = function (func) {
            BABYLON.SceneManager.SetWindowState("onSocketDisconnect", func);
        };
        /** Connects a window state socket */
        SocketController.ConnectWindowSocket = function (connection) {
            var socket = null;
            if (window.frameElement != null && parent != null && parent.window != null && parent.window["socketConnect"]) {
                socket = parent.window["socketConnect"](connection);
            }
            else if (window["socketConnect"]) {
                socket = window["socketConnect"](connection);
            }
            return socket;
        };
        /** Get the window state socket */
        SocketController.GetWindowSocket = function () {
            return BABYLON.SceneManager.GetWindowState("socket");
        };
        return SocketController;
    }());
    BABYLON.SocketController = SocketController;
})(BABYLON || (BABYLON = {}));
var BABYLON;
(function (BABYLON) {
    /**
     * Babylon web video player pro class (Unity Style Shuriken Particle System)
     * @class WebVideoPlayer - All rights reserved (c) 2020 Mackey Kinard
     */
    var WebVideoPlayer = /** @class */ (function (_super) {
        __extends(WebVideoPlayer, _super);
        function WebVideoPlayer() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.m_abstractMesh = null;
            _this.m_videoTexture = null;
            _this.m_videoMaterial = null;
            return _this;
        }
        WebVideoPlayer.prototype.getVideoMaterial = function () { return this.m_videoMaterial; };
        WebVideoPlayer.prototype.getVideoTexture = function () { return this.m_videoTexture; };
        WebVideoPlayer.prototype.getVideoElement = function () { return (this.m_videoTexture != null) ? this.m_videoTexture.video : null; };
        WebVideoPlayer.prototype.getVideoScreen = function () { return this.m_abstractMesh; };
        WebVideoPlayer.prototype.awake = function () { this.awakeWebVideoPlayer(); };
        WebVideoPlayer.prototype.destroy = function () { this.destroyWebVideoPlayer(); };
        WebVideoPlayer.prototype.awakeWebVideoPlayer = function () {
            this.m_abstractMesh = this.getAbstractMesh();
            if (this.m_abstractMesh != null) {
                this.m_videoMaterial = new BABYLON.StandardMaterial(this.transform.name + ".VideoMat", this.scene);
                this.m_videoMaterial.roughness = 1;
                this.m_videoMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
                this.m_abstractMesh.material = this.m_videoMaterial;
                // ..
                // Initial Video Source Setup
                // ..
                var videoUrl = this.getProperty("url", null);
                var videoSrc = this.getProperty("source", null);
                var playUrl = videoUrl;
                if (videoSrc != null && videoSrc.filename != null && videoSrc.filename !== "") {
                    var rootUrl = BABYLON.SceneManager.GetRootUrl(this.scene);
                    playUrl = (rootUrl + videoSrc.filename);
                }
                if (playUrl != null && playUrl !== "") {
                    var videoMuted = this.getProperty("muted", false);
                    var videoPoster = this.getProperty("poster", null);
                    var videoInvert = this.getProperty("inverty", true);
                    var videoSample = this.getProperty("sampling", 3);
                    var videoMipmaps = this.getProperty("mipmaps", false);
                    var videoLooping = this.getProperty("looping", false);
                    var videoPlayOnAwake = this.getProperty("playonawake", true);
                    var videoVolume = this.getProperty("volume", 1.0);
                    var videoPlayback = this.getProperty("playbackspeed", 1.0);
                    //const videoSkipOnDrop:boolean = this.getProperty("skipondrop", true);
                    //const videoWaitForFirstFrame:boolean = this.getProperty("waitforfirstframe", true);
                    //const videoTargetMaterialProperty:string = this.getProperty("targetmaterialproperty", "_MainTex");
                    var videoSettings = { autoUpdateTexture: true, autoPlay: videoPlayOnAwake, loop: videoLooping, muted: videoMuted, poster: videoPoster };
                    this.setVideoSource(playUrl, videoMipmaps, videoInvert, videoSample, videoSettings, videoVolume, videoPlayback);
                }
            }
            else {
                BABYLON.Tools.Warn("No video mesh available for: " + this.transform.name);
            }
        };
        WebVideoPlayer.prototype.destroyWebVideoPlayer = function () {
            this.m_abstractMesh = null;
            if (this.m_videoTexture != null) {
                this.m_videoTexture.dispose();
                this.m_videoTexture = null;
            }
            if (this.m_videoMaterial != null) {
                this.m_videoMaterial.dispose();
                this.m_videoMaterial = null;
            }
        };
        /** Set web video player source */
        WebVideoPlayer.prototype.setVideoSource = function (src, generateMipMaps, invertY, samplingMode, settings, volume, speed) {
            if (generateMipMaps === void 0) { generateMipMaps = false; }
            if (invertY === void 0) { invertY = true; }
            if (samplingMode === void 0) { samplingMode = BABYLON.Texture.TRILINEAR_SAMPLINGMODE; }
            if (volume === void 0) { volume = 1.0; }
            if (speed === void 0) { speed = 1.0; }
            if (this.m_abstractMesh != null && this.m_videoMaterial != null) {
                this.m_videoMaterial.diffuseTexture = null;
                if (this.m_videoTexture != null) {
                    this.m_videoTexture.dispose();
                    this.m_videoTexture = null;
                }
                this.m_videoTexture = new BABYLON.VideoTexture(this.transform.name + ".VideoTex", src, this.scene, generateMipMaps, invertY, samplingMode, settings);
                if (this.m_videoTexture != null && this.m_videoTexture.video != null) {
                    this.m_videoTexture.video.volume = volume;
                    this.m_videoTexture.video.playbackRate = speed;
                }
                this.m_videoMaterial.diffuseTexture = this.m_videoTexture;
            }
            else {
                BABYLON.Tools.Warn("No video mesh or material available for: " + this.transform.name);
            }
        };
        return WebVideoPlayer;
    }(BABYLON.ScriptComponent));
    BABYLON.WebVideoPlayer = WebVideoPlayer;
})(BABYLON || (BABYLON = {}));

// Project Shader Fixes
if (BABYLON.Effect.IncludesShadersStore["pbrBlockFinalColorComposition"]) BABYLON.Effect.IncludesShadersStore["pbrBlockFinalColorComposition"] = BABYLON.Effect.IncludesShadersStore["pbrBlockFinalColorComposition"].replace("finalColor.rgb*=lightmapColor.rgb", "finalColor.rgb*=(lightmapColor.rgb+finalEmissive.rgb)");
if (BABYLON.Effect.ShadersStore["defaultPixelShader"]) BABYLON.Effect.ShadersStore["defaultPixelShader"] = BABYLON.Effect.ShadersStore["defaultPixelShader"].replace("color.rgb *= lightmapColor.rgb", "color.rgb *= (lightmapColor.rgb + finalEmissive.rgb)");